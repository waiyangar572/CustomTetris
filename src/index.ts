import { GameOption } from "./gameOptions";
import { ChangeSizeOfMatrix, GameRule, GameRuleNormal } from "./gameRule";
import { cloneArray, Enum } from "./general";
import { Pos, Tetrimino } from "./global";
import { Tetris } from "./tetris";
import { when } from "./when";


//
//
// const
//
//
function FallingSpeed(level: number): number {
	return 1000*(0.8 - ((level-1) * 0.007))**(level-1);
}

const Actions = ['none','single','double','triple','tetris','mini_tspin','mini_tspin_single','tspin','tspin_single','tspin_double','tspin_triple','back_to_back','softDrop','hardDrop','ren','singlePerfectClear','doublePerfectClear','triplePerfectClear','tetrisPerfectClear','tetrisBtoBPerfectClear'] as const;
type Action = typeof Actions[number];

const ScoreOfAction = new Map<Action, number>();
ScoreOfAction.set("none", 0);
ScoreOfAction.set("single", 100);
ScoreOfAction.set("double", 300);
ScoreOfAction.set("triple", 500);
ScoreOfAction.set("tetris", 800);
ScoreOfAction.set("mini_tspin", 100);
ScoreOfAction.set("mini_tspin_single", 200);
ScoreOfAction.set("tspin", 400);
ScoreOfAction.set("tspin_single", 800);
ScoreOfAction.set("tspin_double", 1200);
ScoreOfAction.set("tspin_triple", 1600);
ScoreOfAction.set("back_to_back", 1.5);
ScoreOfAction.set("softDrop", 1);
ScoreOfAction.set("hardDrop", 2);
ScoreOfAction.set("ren", 50);
ScoreOfAction.set("singlePerfectClear", 800);
ScoreOfAction.set("doublePerfectClear", 1200);
ScoreOfAction.set("triplePerfectClear", 1800);
ScoreOfAction.set("tetrisPerfectClear", 2000);
ScoreOfAction.set("tetrisBtoBPerfectClear", 3200);

const DisplayTitleOfAction = new Map<String, String>();
DisplayTitleOfAction.set("none", '');
DisplayTitleOfAction.set("single", 'Single');
DisplayTitleOfAction.set("double", 'Double');
DisplayTitleOfAction.set("triple", 'Triple');
DisplayTitleOfAction.set("tetris", 'Tetris');
DisplayTitleOfAction.set("mini_tspin", '');
DisplayTitleOfAction.set("mini_tspin_single", 'Mini T-spin Single');
DisplayTitleOfAction.set("tspin", '');
DisplayTitleOfAction.set("tspin_single", 'T-spin Single');
DisplayTitleOfAction.set("tspin_double", 'T-spin Double');
DisplayTitleOfAction.set("tspin_triple", 'T-spin Triple');
DisplayTitleOfAction.set("back_to_back", '');
DisplayTitleOfAction.set("softDrop", '');
DisplayTitleOfAction.set("hardDrop", '');
DisplayTitleOfAction.set("ren", '');
DisplayTitleOfAction.set("score", 'score');
DisplayTitleOfAction.set("ren", 'REN');
DisplayTitleOfAction.set("perfectClear", "perfectClear");

const ActionsEnum = [];

/**
 * scoreに表示しないaction
 * @type {Array}
 */
const notScorings:Action[] = ['hardDrop','softDrop','back_to_back','mini_tspin','tspin','none','ren','singlePerfectClear','doublePerfectClear','triplePerfectClear','tetrisPerfectClear','tetrisBtoBPerfectClear']

//
//
// dialogs
//
//

function initDialogs(): void {
	$('.dialogs').each((i, obj) => {
		//console.log(i,obj);
		$(obj).dialog({
			autoOpen: false,
			modal: false,
			title: 'dialog',
			buttons: { 'ok': function(){
					$(obj).dialog('close')
				}
			}
		})
	})
}

$(function () {
	$('#gameoverDialog').dialog({
		title: 'game over',
		modal: true,
		open: function () {
			$(this).parent().find('.ui-dialog-titlebar-close').hide();
		},
		buttons: {
			'restart': function () {
				startTetris();
				$(this).dialog('close');
			},
			'toMainMenu': function () {
				toMainMenu();
				$(this).dialog('close');
			}
		},
	})

	$('#pauseDialog').dialog({
		title: 'pause',
		modal: true,
		closeOnEscape: false,
		open: function () {
			isPausing = true;
			currentMinoLockDownTimer.pauseTimeout();
			pauseTimer('fall');
			addKeyActions({code:'Escape', keydownAc:function() {
				removeKeyActions('Escape');
				$('#pauseDialog').dialog('close');
				if (canFall()) {
					restartTimer('fall');
				} else {
					currentMinoLockDownTimer.restartTimeout();
				}
			}});
			$(this).parent().find('.ui-dialog-titlebar-close').hide();
		},
		close: function () {
			removeKeyActions('Escape');
			addPauseKeyActions('Escape');
			isPausing = false;
		},
		buttons: {
			'close': function () {
				$(this).dialog('close');
				if (canFall()) {
					restartTimer('fall');
				} else {
					currentMinoLockDownTimer.restartTimeout();
				}
			},
			'restart': function () {
				endTetris();
				$(this).dialog('close');
				startTetris();
			},
			'toMainMenu': function () {
				endTetris();
				$(this).dialog('close');
				toMainMenu();
			}
		}
	})
})

//
//
// tetrisGameType
//
//

const PracticeFor4ren = new GameRuleNormal({
	name:'practiceFor4ren',
	title:'4line REN',
	generateTerrain:() => {
		let terrainArray = GameRule.Normal.generateTerrain();
		forEachMinoOnField((pos) => {
			if (pos.x<3 || pos.x>6) {
				terrainArray[pos.y][pos.x] = 'wall';
			}
		})
		terrainArray[21][3] = 'wall';
		terrainArray[21][4] = 'wall';
		terrainArray[21][5] = 'wall';

		return terrainArray;
	},
	generateRegularlyTerrain:() => {
		let terrain:Tetrimino[] = GameRule.Normal.generateRegularlyTerrain();
		terrain[0] = 'wall';
		terrain[1] = 'wall';
		terrain[2] = 'wall';
		terrain[7] = 'wall';
		terrain[8] = 'wall';
		terrain[9] = 'wall';

		return terrain;
	}
})

const wideMatrix = new ChangeSizeOfMatrix<Tetrimino>(
	'wideMatrix',
	'wide Matrix',
	25,15,2
)

const HideFallingMinos = new GameRuleNormal({
	name: 'hideFallingMinos',
	title: 'to hide falling minos',
	cssClass: 'hideFallingMinos',
})

const StackingForPerfect: GameRule<Tetrimino> = new GameRuleNormal({
	name: 'stackingForPerfect',
	title: 'パフェ積み',
	generateTerrain: () => {
		const normalTerrain = GameRule.Normal.generateTerrain();

		return getMirrorFieldAtRnd(setWall(normalTerrain,
					[
						{x:0,y:21},{x:1,y:21},{x:2,y:21},{x:7,y:21},{x:8,y:21},{x:9,y:21},
						{x:0,y:20},{x:1,y:20},{x:2,y:20},{x:3,y:20},{x:7,y:20},{x:8,y:20},{x:9,y:20},
						{x:0,y:19},{x:1,y:19},{x:2,y:19},{x:7,y:19},{x:8,y:19},{x:9,y:19},
						{x:0,y:18},{x:1,y:18},{x:7,y:18},{x:8,y:18},{x:9,y:18}
					]
				))
	},
	arrangeFirstSituation: () => {
		holdMinoType = 'i'
		displayHold()
	},
	arrangeSituation: () => {
		if (totalFallenTetrimino%4==0) {
			holdMinoType = 'i';
			fieldArray = StackingForPerfect.generateTerrain();
			displayAllMinos()
			displayHold()
			followingMinos = [];
		}
	}
})

const WantToTSpin = new GameRuleNormal({
	name: 'wantToT-spin',
	title: 'T-spinをしたい',
	generateTerrain: () => {
		const normalTerrain = GameRule.Normal.generateTerrain();

		console.log(WantToTSpin.data);
		switch (WantToTSpin.data) {
			case 0:
				return setWall(normalTerrain, [
					...lineWithHole(7,[2,3]),
					...lineWithHole(8,[1,2,3]),
					...lineWithHole(9,[1]),
					...lineWithHole(10,[1,2]),
					...lineWithHole(11,[1,2]),
					...lineWithHole(12,[1,2,3]),
					...lineWithHole(13,[3]),
					...lineWithHole(14,[2,3]),
					...lineWithHole(15,[2,3]),
					...lineWithHole(16,[1,2,3]),
					...lineWithHole(17,[1]),
					...lineWithHole(18,[1,2]),
					...lineWithHole(19,[1,2]),
					...lineWithHole(20,[1,2,3]),
					...lineWithHole(21,[2]),
				]);
			case 1:
				return setWall(normalTerrain, [
					...lineWithHole(8,[0,1]),
					...lineWithHole(9,[0,1,2]),
					...lineWithHole(10,[2]),
					...lineWithHole(11,[1,2]),
					...lineWithHole(12,[2]),
					...lineWithHole(13,[2]),
					...lineWithHole(14,[1,2]),
					...lineWithHole(15,[2]),
					...lineWithHole(16,[2]),
					...lineWithHole(17,[1,2]),
					...lineWithHole(18,[2]),
					...lineWithHole(19,[2]),
					...lineWithHole(20,[1,2]),
					...lineWithHole(21,[2]),
				]);
			case 2:
				return setWall(normalTerrain, [
					...lineWithHole(6,[1,2]),
					...lineWithHole(7,[1,2,3,4,5]),
					...lineWithHole(8,[1,2,3,4,5]),
					...lineWithHole(9,[4,5]),
					...lineWithHole(10,[4,5,6]),
					...lineWithHole(11,[6]),
					...lineWithHole(12,[4,5,6]),
					...lineWithHole(13,[4,5,6]),
					...lineWithHole(14,[4]),
					...lineWithHole(15,[6]),
					...lineWithHole(16,[5,6,7]),
					...lineWithHole(17,[5,6]),
					...lineWithHole(18,[4,5]),
					...lineWithHole(19,[4]),
					...lineWithHole(20,[2,3]),
					...lineWithHole(21,[3]),
				]);
			case 3:
				return setWall(normalTerrain, [
					...lineWithHole(9, [1,2]),
					...lineWithHole(10, [1,2,3]),
					...lineWithHole(11, [3]),
					...lineWithHole(12, [2,3,4]),
					...lineWithHole(13, [3,4]),
					...lineWithHole(14, [3,4,5]),
					...lineWithHole(15, [5]),
					...lineWithHole(16, [4,5,6]),
					...lineWithHole(17, [5,6]),
					...lineWithHole(18, [5,6,7]),
					...lineWithHole(19, [7]),
					...lineWithHole(20, [6,7]),
					...lineWithHole(21, [7]),
				]);
			default:
				return normalTerrain;
		}

	},
	arrangeFirstSituation: () => {
		followingMinos = ['t','t','t','t','t','t','t'];
		WantToTSpin.data = Math.floor(Math.random() * 3);
	},
	arrangeSituation: () => {
		followingMinos = ['t','t','t','t','t','t','t'];
		let loopNum;
		console.log(WantToTSpin.data);
		switch (WantToTSpin.data) {
			case 0:
				loopNum = 7;
				break;
			case 1:
				loopNum = 4;
				break;
			case 2:
				loopNum = 7;
				break;
			case 3:
				loopNum = 6;
				break;
			default:
				loopNum = 1;
				break;
			}
		if (totalFallenTetrimino%loopNum==0) {
			totalFallenTetrimino = 0;
			WantToTSpin.data = Math.floor(Math.random() * 4);
			fieldArray = WantToTSpin.generateTerrain();
			displayAllMinos()
		}
	},
	setterOfData: (data: 0) => {return data;},
	getterOfData: (data: 0) => {return data;},
})

const LElevator = new GameRuleNormal({
	name: 'LElevator',
	title: 'Lエレベーター',
	generateTerrain: () => {
		const normalTerrain = GameRule.Normal.generateTerrain();

		return setWall(normalTerrain, [
			...lineWithHole(7, [1,8]),
			...lineWithHole(8, [1,2,3,6,7,8]),
			...lineWithHole(9, [1,2,6]),
			...lineWithHole(10, [2,6,8]),
			...lineWithHole(11, [0,1,2,6,7,8]),
			...lineWithHole(12, [1,7,8]),
			...lineWithHole(13, [1,2,3,8]),
			...lineWithHole(14, [1,2,6,7,8]),
			...lineWithHole(15, [2,6]),
			...lineWithHole(16, [0,1,2,6,8]),
			...lineWithHole(17, [1,6,7,8]),
			...lineWithHole(18, [1,2,3,7,8]),
			...lineWithHole(19, [1,2,4,6,8]),
			{x:0, y:20},{x:1, y:20},{x:9, y:20},
			{x:8, y:21},{x:9, y:21},
		])
	},
	arrangeFirstSituation: () => {
		followingMinos = ['l','l','l','l','l','l','l'];
		holdMinoType = 'l';
	},
	arrangeSituation: () => {
		followingMinos = ['l','l','l','l','l','l','l'];
	},
	isAllowedOperation: () => {
		return true;
	}
})

const OSpin = new GameRuleNormal({
	name: 'OSpin',
	title: 'Oスピン',
	spinRule: spinRuleRegulator(GameRule.Normal.spinRule.set('o', [
					[
						[
							{x:1,y:0},
							{x:-1,y:0},
							{x:1,y:-1},
							{x:-1,y:2}
						],[
							{x:0,y:-1},
							{x:0,y:1},
							{x:1,y:-1},
							{x:-2,y:1}
						]
					],[
						[
							{x:0,y:1},
							{x:0,y:-1},
							{x:1,y:1},
							{x:-2,y:-1}
						],[
							{x:1,y:0},
							{x:-1,y:0},
							{x:1,y:1},
							{x:1,y:-2}
						]
					],[
						[
							{x:-1,y:0},
							{x:1,y:0},
							{x:-1,y:1},
							{x:-1,y:-2}
						],[
							{x:0,y:1},
							{x:0,y:-1},
							{x:-1,y:1},
							{x:1,y:1}
						]
					],[
						[
							{x:0,y:1},
							{x:0,y:-1},
							{x:-1,y:-1},
							{x:2,y:-1}
						],[
							{x:-1,y:0},
							{x:1,y:0},
							{x:-1,y:-1},
							{x:1,y:2}
						]
					]
				])),
	cssClass: 'ospin',
	getRotatedTetriminoShape: (type:Tetrimino, d:number):Pos[] => {
		if (type=='o') {
			console.log(changeFacing(getTetriminoShape(type)!,d));
			return changeFacing(getTetriminoShape(type)!,d);
		} else {
			return GameRule.Normal.getRotatedTetriminoShape(type, d);
		}
	},
	justBeforeLockDown: (data: any): boolean => {
		console.log(currentMinoX, currentMinoY);
		
		let bm1 = canMove(getMovedAndRotatedTetrimino(-2,2,1,'i'));
		let b0 = canMove(getMovedAndRotatedTetrimino(-1,2,1,'i'));
		let b1 = canMove(getMovedAndRotatedTetrimino(0,2,1,'i'));
		if (currentMinoShape!='o' || (!bm1&&!b0&&!b1) || gameRuleOption.currentOption.isAllowedOperation(numberOfMoveWithLowerFace)) {
			gameRuleOption.currentOption.data = false;
			return true;
		} else {
			if(b0) {
				moveAndRotate(-1, 2, 1, ()=>{}, 'i', 'o');
			} else if (bm1) {
				moveAndRotate(-2, 2, 1, ()=>{}, 'i', 'o');
			} else {
				moveAndRotate(0, 2, 1, ()=>{}, 'i', 'o');
			}
			currentMinoShape = 'i';
			currentMinoLockDownTimer.clearTimeout();
			numberOfMoveWithLowerFace = 0;
			gameRuleOption.currentOption.data = true;
			loopOfFall();
			return false;
		}
	},
	getterOfData: (data: boolean)=>{return data;},
	setterOfData: (data: boolean)=>{return data;},
})

function setWall(field: readonly Tetrimino[][],poses: readonly Pos[]): Tetrimino[][] {
	let field_cloned = cloneArray(field);
	for (const pos of poses) {
		field_cloned[pos.y][pos.x] = 'wall';
	}
	return field_cloned;
}

function lineWithHole(y: number, holes: number[]): Pos[] {
	let line = [] as Pos[];
	for (let x = 0; x < gameRuleOption.currentOption.fieldWidth; x++) {
		if (!holes.includes(x)) {
			line.push({x:x, y:y});
		}
	}
	return line;
}

const GameRules: GameRule<string>[] = [GameRule.Normal, PracticeFor4ren, wideMatrix, HideFallingMinos, OSpin, StackingForPerfect, WantToTSpin, LElevator];
//type GameRule = typeof GameRules[number];
function EnumOfGameRule<TetriminoClass>():Enum<GameRule<TetriminoClass>> {
	return {
		defArray: GameRules,
		isEnum: toGameRule,
		toString: GameRule.toString,
		getTitle: GameRule.getTitle,
	}
}

function toString(arg: string): string {
	return arg as string;
}

const gameRuleOption: GameOption<GameRule<string>> = new GameOption<GameRule<string>>(
	'gameRule',
	0,
	EnumOfGameRule(),
	(op: string) => {return `<button class="infoButtons" data-op="${op}"><i class="fas fa-info-circle"></i></button>`},
	(op: string) => {
		$("#infoDialog").html(
			when(op)
				.on(v => v=='normal', () => '普通のテトリス')
				.on(v => v=='practiceFor4ren', () => '4列RENの練習')
				.on(v => v=='wideMatrix', () => '大きさが15×25になったテトリス')
				.on(v => v=='hideFallingMinos', () => '落ちてくるミノが隠れています。<br>代わりにミノの回転の中心(Oミノは左上、Iミノは上向きで左から2番目)の位置が白く表示されます。')
				.on(v => v=='stackingForPerfect', () => 'パフェ積み(左右反転あり、Iミノホールド)の練習')
				.on(v => v=='wantToT-spin', () => 'ひたすらTスピンができます')
				.on(v => v=='LElevator', () => 'Lミノを無限に回し続けられます')
				.on(v => v=='ospin', () => 'O-Spinができる')
				.otherwise(() => 'info')
		)
		$('#infoDialog').dialog('open');
	}
);
$(document).off('click', '.infoButtons');
$(document).on('click', '.infoButtons', function() {
	gameRuleOption.customFunc($(this).data('op'))
})

function toGameRule<TetriminoClass>(arg: any): arg is GameRule<TetriminoClass> {
	return (GameRules.includes(arg as GameRule<TetriminoClass>));
}


// function resetField() {
// 	console.log(gameRuleOption.currentOption);
// 	fieldArray = gameRuleOption.currentOption.generateTerrain();
// }

function getRegularlyTerrain() {
	return gameRuleOption.currentOption.generateRegularlyTerrain();
}


//
//
// Tetris
//
//

//
//
// tetriminos
//
//

let currentTetris: Tetris<string>;

function startTetris(): void {
	currentTetris = new Tetris()
}

//
//
// init
//
//

initDialogs()

$('#startButton').off('click');
$(document).on('click','#startButton', () => {
	console.log('start!!');
	startTetris()
})
//$(document).on('touched','#startButton', () => {
	//	initTetris();
	//	startTetris();
	//})

$('#toKeyBindings').off('click');
$(document).on('click','#toKeyBindings', () => {
	toKeyBindings();
})

$('#fromKeyToMainMenu').off('click');
$(document).on('click','#fromKeyToMainMenu', () => {
	$(document).off('.onClickKeyForAny');
	toMainMenu();
})

$('#pauseButton').off('click');
$(document).on('click', '#pauseButton', ()=>{
	$('#pauseDialog').dialog('open');
})

//$(document).on('touched','#fromKeyToMainMenu', () => {
//	toMainMenu();
//})

toMainMenu()