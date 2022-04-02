import "./_variables.scss";
import "./master.scss";
import "./media.scss";
import "./tetriminos.scss";

import { setButtonActions } from "./buttonAction";
import { GameOption } from "./gameOptions";
import { ChangeSizeOfMatrix, GameRule, GameRuleNormal, spinRuleRegulator } from "./gameRule";
import { cloneArray, Enum, hasTouchScreen, setCssVar, toLowerFirstLetter, toUpperFirstLetter } from "./general";
import { changeFacing, getMovedMinos, getMovedShape, getRotatedMinos, getRotatedShape, Operate, Operations, Pos, SkeletonsOfTetriminoNormal, Tetrimino, TetriminoAttrs, TetriminoNormal, TetriminoNormalAttrMap, TetriminoNormals } from "./global";
import { addKeyActions, removeKeyActions } from "./keyinput";
import { Tetris } from "./tetris";
import { when } from "./when";
import { TetriminoClass } from "./tetrimino";
import { InvertibleMap } from "./InversiveMap";
import { Swiper } from "./SwiperClass";


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
// tetrisKeyinput
//
//

let swiper: Swiper;

let dv2Border = 4.5;

const MethodsOfOpForTouch = ['swipe', 'button'] as const;
type MethodOfOpForTouch = typeof MethodsOfOpForTouch[number];
const MethodOfOpForTouchEnum: Enum<MethodOfOpForTouch> = {
	defArray: MethodsOfOpForTouch,
	isEnum: toMethodsOfOpForTouch,
	toString: toString,
	getTitle: getTitleOfMethodOfOpForTouch,
}
const MethodOfOpForTouchOption = new GameOption('methodOfOpForTouch', 0, MethodOfOpForTouchEnum);

function toMethodsOfOpForTouch(arg: any): arg is MethodOfOpForTouch {
	return MethodsOfOpForTouch.includes(arg as MethodOfOpForTouch);
}
//function toString(arg: MethodOfOpForTouch): string {
//	console.log(arg,arg as string);
//	return arg as string;
//}
function getTitleOfMethodOfOpForTouch(arg: MethodOfOpForTouch): string {
	switch (arg) {
		case 'swipe':
			return 'スワイプ'

		case 'button':
			return 'ボタン';
	}
}

let keyBinding = new Map<Operate, string>();

document.oncontextmenu = function () {return false;}
document.body.oncontextmenu = () => {
	return false;
}
document.addEventListener('touchmove', function (e) {
	e.preventDefault();
}, {passive: false})

function addRightKeyActions(key: string): void {
	addKeyActions({code:key, keydownAc:onRight, longpressAc:onRight, sec:183, interval:33});
	keyBinding.set('right', key);
}

function addLeftKeyActions(key:string) {
	addKeyActions({code:key, keydownAc:onLeft, longpressAc:onLeft, sec:183, interval:33});
	keyBinding.set('left', key);
}

function addHardDropKeyActions(key:string) {
	addKeyActions({code:key, keydownAc:onHardDrop, longpressAc:onHardDrop, sec:300, interval: 300})
	keyBinding.set('hardDrop', key);
}

function addSoftDropKeyActions(key:string) {
	addKeyActions({code:key, keydownAc:onSoftDrop.bind(null,true), keyupAc:onSoftDrop.bind(null,false), longpressAc:onSoftDrop.bind(null,true)})
	keyBinding.set('softDrop', key);
}

function addLeftRotationActions(key:string) {
	addKeyActions({code:key, keydownAc:onLeftRotation})
	keyBinding.set('leftRotation', key);
}

function addRightRotationActions(key:string) {
	addKeyActions({code:key, keydownAc:onRightRotation})
	keyBinding.set('rightRotation', key);
}

function addHoldActions(key:string) {
	addKeyActions({code:key, keydownAc:onHold})
	keyBinding.set('hold', key);
}

function addKeyBinding(type:string, key:string) {
	switch (type) {
		case 'left':
			addLeftKeyActions(key);
			break;
		case 'right':
			addRightKeyActions(key)
			break;
		case 'softDrop':
			addSoftDropKeyActions(key);
			break;
		case 'hardDrop':
			addHardDropKeyActions(key);
			break;
		case 'leftRotation':
			addLeftRotationActions(key);
			break;
		case 'rightRotation':
			addRightRotationActions(key);
			break;
		case 'hold':
			addHoldActions(key);
			break;
		default:
			break;
	}
}

function addPauseKeyActions(key: string) {
	addKeyActions({code:key, keydownAc:()=> {
		removeKeyActions(key);
		$('#pauseDialog').dialog('open');
	}})
}

addRightKeyActions('d');
addLeftKeyActions('a');
addHardDropKeyActions('w');
addSoftDropKeyActions('s');
addLeftRotationActions('ArrowLeft');
addRightRotationActions('ArrowRight');
addHoldActions('Shift');

//addPauseKeyActions('Escape');

function toOperate(str: string): Operate|undefined {
	if (Operations.includes(str as Operate)) {
		return str as Operate;
	} else {
		return undefined;
	}
}

$(document).on('click', '.keyForAny', (e1) => {
	const type_pre = $(e1.currentTarget).attr('id');
	//console.log(e1,type_pre);
	if (typeof type_pre === 'string') {
		const type = type_pre.slice(6);
		const type_lower = toLowerFirstLetter(type);
		const formerKey = keyBinding.get(toOperate(type_lower)!);
		if (typeof formerKey !== 'undefined') {
			removeKeyActions(formerKey);
		}
		$(document).off('.onClickKeyForAny');
		$(document).on('keydown.onClickKeyForAny', (e) => {
			const currentKey = e.key;
			$(document).off('.onClickKeyForAny');
			if (typeof currentKey === 'string') {
				//console.log(type,currentKey);
				const thisKeybinding = keyBinding.get(toOperate(type_lower)!)!;
				for (const iterator of keyBinding.entries()) {
					//console.log(iterator[1],currentKey,thisKeybinding);
					if (iterator[1]==currentKey) {
						console.log(iterator[0],'#keyFor'+toUpperFirstLetter(iterator[0]));
						removeKeyActions(currentKey);
						addKeyBinding(iterator[0], thisKeybinding);
						$('#keyFor'+toUpperFirstLetter(iterator[0])).text(thisKeybinding);
					}
				}
				addKeyBinding(type_lower, currentKey);
				$('#keyFor'+type).text(currentKey);
			}
		})
	}
})


setButtonActions('.buttonsToOperate[data-operate="left"]', 300, 50);
setButtonActions('.buttonsToOperate[data-operate="right"]', 300, 50);
setButtonActions('.buttonsToOperate[data-operate="softDrop"]');
setButtonActions('.buttonsToOperate[data-operate="hardDrop"]');
setButtonActions('.buttonsToOperate[data-operate="leftRotation"]');
setButtonActions('.buttonsToOperate[data-operate="rightRotation"]');
setButtonActions('.buttonsToOperate[data-operate="hold"]');

$(document).on('pressstart', '.buttonsToOperate[data-operate="left"]', (e) => {
	e.preventDefault();
	//console.log('pressstart');
	onLeft()
})
$(document).on('longpress', '.buttonsToOperate[data-operate="left"]', (e) => {
	e.preventDefault();
	//console.log('longpress');
	onLeft()
})
$(document).on('pressstart', '.buttonsToOperate[data-operate="right"]', (e) => {
	e.preventDefault();
	//console.log('pressstart');
	onRight()
})
$(document).on('longpress', '.buttonsToOperate[data-operate="right"]', (e) => {
	e.preventDefault();
	//console.log('longpress');
	onRight()
})
$(document).on('pressstart', '.buttonsToOperate[data-operate="softDrop"]', (e) => {
	e.preventDefault();
	onSoftDrop(true);
})
$(document).on('pressend', '.buttonsToOperate[data-operate="softDrop"]', (e) => {
	e.preventDefault();
	onSoftDrop(false);
})
$(document).on('pressstart', '.buttonsToOperate[data-operate="hardDrop"]', (e) => {
	e.preventDefault();
	onHardDrop()
})
$(document).on('pressstart', '.buttonsToOperate[data-operate="leftRotation"]', (e) => {
	e.preventDefault();
	onLeftRotation()
})
$(document).on('pressstart', '.buttonsToOperate[data-operate="rightRotation"]', (e) => {
	e.preventDefault();
	onRightRotation()
})
$(document).on('pressstart', '.buttonsToOperate[data-operate="hold"]', (e) => {
	e.preventDefault();
	onHold()
})

function switchOperate(type:Operate, b?: boolean): void {
	switch(type) {
		case 'left':
			onLeft();
			break;
		case 'right':
			onRight();
			break;
		case 'softDrop':
			if (typeof b !== 'undefined') {
				onSoftDrop(b);
			}
			break;
		case 'hardDrop':
			onHardDrop();
			break;
		case 'leftRotation':
			onLeftRotation();
			break;
		case 'rightRotation':
			onRightRotation();
			break;
		case 'hold':
			onHold();
			break;
		default:
			break;
	}
}

$(document).on('swipedist', function (e, d, dv2) {
	console.log(d);
	switch (d) {
		case 'left':
			onLeft()
			break;
		case 'right':
			onRight()
			break;
	}
})

$(document).on('swipestart', function (e, d, dv2) {
	switch (d) {
		case 'up':
			onHold()
			break;
	}
})

$(document).on('longswipe', function (e, d, dv2) {
	//console.log(redLog + dv2 + resetLogColor);
	// console.log(greenLog + d + resetLogColor);
	if (d != "down") {
		onSoftDrop(false)
	}
	switch (d) {
		case 'down':
			onSoftDrop(true)
			break;
		case 'up':
			onHold()
			break;
	}
})

$(document).on('swipeend', function (e, d, dv2) {
	//console.log(redLog + dv2 + resetLogColor);
	onSoftDrop(false)
	switch (d) {
		case 'down':
			if (dv2 > dv2Border) {
				onHardDrop()
			}
			break;
		case 'up':
			onHold()
			break;
	}
})

$(document).on('touched', function (e, x, y) {
	console.log(x,y);
	const pointElement = jQuery(document.elementFromPoint(x,y)!);
	if (pointElement.get(0).tagName == 'BUTTON') {
		pointElement.trigger('click');
	} else if (x > $(window).width()! / 2) {
		onRightRotation()
	} else {
		onLeftRotation()
	}
})


function onLeft() {
	currentTetris.left();
}

function onRight() {
	currentTetris.right();
}

function onSoftDrop(b: boolean) {
	currentTetris.softDrop(b)
}

function onHardDrop() {
	currentTetris.hardDrop();
}

function onRightRotation() {
	currentTetris.rightRotation();
}

function onLeftRotation() {
	currentTetris.leftRotation();
}

function onHold() {
	currentTetris.hold();
}

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
			currentTetris.isPausing = true;
			currentTetris.lockDownTimer.pauseTimeout();
			currentTetris.fallTimer.pauseTimeout();
			removeKeyActions('Escape');
			addKeyActions({code:'Escape', keydownAc:() => {
				console.log("add key action of escape");
				
				removeKeyActions('Escape');
				$('#pauseDialog').dialog('close');
				addPauseKeyActions('Escape');
				if (currentTetris.canFall()) {
					currentTetris.fallTimer.restartTimeout();
				} else {
					currentTetris.lockDownTimer.restartTimeout();
				}
			}});
			$(this).parent().find('.ui-dialog-titlebar-close').hide();
		},
		close: function () {
			removeKeyActions('Escape');
			addPauseKeyActions('Escape');
			currentTetris.isPausing = false;
		},
		buttons: {
			'close': function () {
				$(this).dialog('close');
				if (currentTetris.canFall()) {
					currentTetris.fallTimer.restartTimeout();
				} else {
					currentTetris.lockDownTimer.restartTimeout();
				}
			},
			'restart': function () {
				currentTetris.end();
				$(this).dialog('close');
				startTetris();
			},
			'toMainMenu': function () {
				currentTetris.end();
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
		currentTetris.forEachMinoOnField((pos) => {
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

const wideMatrix = new ChangeSizeOfMatrix(
	'wideMatrix',
	'wide Matrix',
	25,15,2
)

const HideFallingMinos = new GameRuleNormal({
	name: 'hideFallingMinos',
	title: 'to hide falling minos',
	cssClass: 'hideFallingMinos',
})

const StackingForPerfect: GameRule = new GameRuleNormal({
	name: 'stackingForPerfect',
	title: 'パフェ積み',
	generateTerrain: () => {
		const normalTerrain = GameRule.Normal.generateTerrain();

		return Tetris.getMirrorFieldAtRnd(setWall(normalTerrain,
					[
						{x:0,y:21},{x:1,y:21},{x:2,y:21},{x:7,y:21},{x:8,y:21},{x:9,y:21},
						{x:0,y:20},{x:1,y:20},{x:2,y:20},{x:3,y:20},{x:7,y:20},{x:8,y:20},{x:9,y:20},
						{x:0,y:19},{x:1,y:19},{x:2,y:19},{x:7,y:19},{x:8,y:19},{x:9,y:19},
						{x:0,y:18},{x:1,y:18},{x:7,y:18},{x:8,y:18},{x:9,y:18}
					]
				))
	},
	arrangeFirstSituation: () => {
		currentTetris.holdMinoType = 'i'
		currentTetris.displayHold()
	},
	arrangeSituation: () => {
		if (currentTetris.totalFallenTetrimino%4==0) {
			currentTetris.holdMinoType = 'i';
			currentTetris.fieldArray = StackingForPerfect.generateTerrain();
			currentTetris.displayAllMinos()
			currentTetris.displayHold()
			currentTetris.bag = [];
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
			default:
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
		}

	},
	arrangeFirstSituation: () => {
		currentTetris.bag = ['t','t','t','t','t','t','t'];
		WantToTSpin.data = Math.floor(Math.random() * 3);
	},
	arrangeSituation: () => {
		currentTetris.bag = ['t','t','t','t','t','t','t'];
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
		if (currentTetris.totalFallenTetrimino%loopNum==0) {
			currentTetris.totalFallenTetrimino = 0;
			WantToTSpin.data = Math.floor(Math.random() * 4);
			currentTetris.fieldArray = WantToTSpin.generateTerrain();
			currentTetris.displayAllMinos()
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
		currentTetris.bag = ['l','l','l','l','l','l','l'];
		currentTetris.holdMinoType = 'l';
	},
	arrangeSituation: () => {
		currentTetris.bag = ['l','l','l','l','l','l','l'];
	},
	shouldResetLockDownTimer: () => {
		return true;
	}
})

const OSpin = new GameRuleNormal({
	name: 'OSpin',
	title: 'Oスピン',
	rotationRule: GameRule.Normal.rotationRule.set('o', [
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
				]),
	getDifOfShaft: (shape: string, facing: 0|1|2|3) => {
				if (TetriminoNormal.getTetriminoWidth(shape)%2==0) {
					if (TetriminoNormal.getTetriminoHeight(shape)%2==0) {
						return {x:0, y:0};
					} else {
						switch (facing) {
							case 0:
								return {x:0,y:0};
							case 1:
								return {x:1,y:0};
							case 2:
								return {x:1,y:1};
							case 3:
								return {x:0,y:1};
						}
					}
				} else {
					return {x:0,y:0};
				}
			},
	cssClass: 'ospin',
	justBeforeLockDown: (data: any): boolean => {
		const rotated = getRotatedShape(TetriminoNormal.getTetriminoShape("i")!, {x:0,y:0}, 1);

		let bm1 = currentTetris.canMove(getMovedShape(rotated,currentTetris.currentPos.x-2,currentTetris.currentPos.y+1));
		let b0 = currentTetris.canMove(getMovedShape(rotated,currentTetris.currentPos.x-1,currentTetris.currentPos.y+1));
		let b1 = currentTetris.canMove(getMovedShape(rotated,currentTetris.currentPos.x+0,currentTetris.currentPos.y+1));
		if (currentTetris.currentMinoShape!='o' || (!bm1&&!b0&&!b1) || OSpin.shouldResetLockDownTimer(currentTetris.numOfOperationsInLockDownPhase)) {
			gameRuleOption.currentOption.data = false;
			return true;
		} else {
			currentTetris.hideCurrentMino();
			currentTetris.currentMinoShape = 'i';
			const followingRotated = getMovedMinos(Tetris.replaceMinoType(rotated, 'o'), currentTetris.currentPos.x, currentTetris.currentPos.y);
			if(b0) {
				currentTetris.relocate(getMovedMinos(followingRotated,-1,1));
				currentTetris.currentPos = {x:currentTetris.currentPos.x-1, y:currentTetris.currentPos.y+1};
			} else if (bm1) {
				currentTetris.relocate(getMovedMinos(followingRotated,-2,1));
				currentTetris.currentPos = {x:currentTetris.currentPos.x-2, y:currentTetris.currentPos.y+1};
			} else {
				currentTetris.relocate(getMovedMinos(followingRotated,0,1));
				currentTetris.currentPos = {x:currentTetris.currentPos.x, y:currentTetris.currentPos.y+1};
			}
			currentTetris.currentFacing = 1;
			const dif = OSpin.getDifOfShaft("i", currentTetris.currentFacing);
			currentTetris.currentPos = {x:currentTetris.currentPos.x-dif.x, y:currentTetris.currentPos.y-dif.y}
			currentTetris.relocateGhost();
			currentTetris.lockDownTimer.clearTimeout();
			currentTetris.numOfOperationsInLockDownPhase = 0;
			gameRuleOption.currentOption.data = true;
			currentTetris.rejectPhase();
			currentTetris.fallPhase();
			return false;
		}
	},
	getterOfData: (data: boolean)=>{return data;},
	setterOfData: (data: boolean)=>{return data;},
})

// const Tetris3AttrMap = new InvertibleMap<Tetrimino, TetriminoAttrs>();
// Tetris3AttrMap.set("l", "block");
// Tetris3AttrMap.set("j", "block");
// Tetris3AttrMap.set("shi", "block");
// Tetris3AttrMap.set("i", "block");
// Tetris3AttrMap.set("v", "block");
// Tetris3AttrMap.set("empty", "empty");
// Tetris3AttrMap.set("wall", "wall");

const Tetris3Skelton = new Map<Tetrimino, (0|1)[][]>();
Tetris3Skelton.set("l", [[1,0],[1,1]]);
Tetris3Skelton.set("j", [[1,0,0],[0,1,1]]);
Tetris3Skelton.set("shi", [[0,0,1],[1,1,0]]);
Tetris3Skelton.set("i", [[1,1,1]]);
Tetris3Skelton.set("v", [[1,0,1],[0,1,0]]);

const Tetris3 = GameRule.generateGameRule("Tetris3", "tetris3(自動生成)", Tetris3Skelton);

// const Tetrimino3 = new TetriminoClass(
// 	["l","j","shi","i","v","empty","wall"],
// 	Tetris3AttrMap,
// 	Tetris3Skelton
// );

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

const GameRules: GameRule[] = [GameRule.Normal, PracticeFor4ren, wideMatrix, HideFallingMinos, OSpin, StackingForPerfect, WantToTSpin, LElevator, Tetris3] as GameRule[];
//type GameRule = typeof GameRules[number];
function EnumOfGameRule():Enum<GameRule> {
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

const gameRuleOption: GameOption<GameRule> = new GameOption<GameRule>(
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

function toGameRule(arg: any): arg is GameRule {
	return (GameRules.includes(arg));
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

let currentTetris: Tetris;

function startTetris(): void {
	toGame();
	currentTetris = new Tetris(gameRuleOption.currentOption);
	console.log(currentTetris);
	
	addPauseKeyActions('Escape');
	if (MethodOfOpForTouchOption.currentOption=='swipe') {
		swiper = new Swiper(document, 40, 300, 50)
	}
	if (MethodOfOpForTouchOption.currentOption=='button') {
		displayButtonsToOperate();
	} else {
		hideButtonsToOperate();
	}

	currentTetris.start();
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

//
//
// display
//
//



//
//
//	メインメニュー
//
//

function hideAll() {
	$('#gameArea').css('display', 'none');
	$('#mainMenuArea').css('display', 'none');
	$('#keyBindingsArea').css('display', 'none');
}

function toMainMenu(): void {
	displayMainMenu();
	clearScoreArea();
	clearHoldArea();
	clearNextArea();
	if (currentTetris) {
		currentTetris.clearField();
		currentTetris.end();
	}
	if(typeof swiper !== 'undefined') {
		swiper.destructor();
	}

	hideAll();
	removeKeyActions('Escape')
	$('#mainMenuArea').css('display','block');
	$('#pauseButton').css('display', 'none');
}
function toGame() {
	hideAll();
	$('#gameArea').css('display','grid');
	$('#pauseButton').css('display', 'block');
}
function toKeyBindings() {
	hideAll();
	$('#keyBindingsArea').css('display','block');
	displayKeyBindings()
}

function displayMainMenu(): void {
	displayStartButton();
	displayOptions();
}

function displayStartButton(): void {
	$('#startButtonArea').html(textOfStartButton());
}

function displayOptions(): void {
	$('#optionsArea').html(textOfOptions());
	gameRuleOption.displayRadioOption('#optionsArea');

	//$('input[name="gameRule"]').val([gameRuleOption.currentOption]);
}

function textOfStartButton(): string {
	return	'<button id="startButton">ゲームスタート</button>'
}

function textOfOptions(): string {
	let text = '';
	text += '<button id="toKeyBindings">操作設定</button>'
	text += '<div></div>';
	return text;
}

function displayKeyBindings() {
	$('#keyBindingsArea').html(textOfFromKeyToMainMenu());
	if (hasTouchScreen()) {
		MethodOfOpForTouchOption.displayRadioOption('#keyBindingsArea')
		//$('#keyBindingsArea').append(textOfKeyBindingsForTouch());
	} else {
		$('#keyBindingsArea').append(textOfKeyBindingsForPC());

		for (const operation of Operations) {
			//console.log(operation, keyBinding.get(operation));
			$('#keyFor'+toUpperFirstLetter(operation)).text(keyBinding.get(operation)!);
		}
	}
}

function textOfFromKeyToMainMenu(): string {
	return '<button id="fromKeyToMainMenu">メインメニュー</button>';
}

function textOfKeyBindingsForPC(): string {
	let text = '';
	text += `
		<table border='1'>
			<tr>
				<th>操作</th>
				<th>キー</th>
			</tr>
			<tr>
				<td>左移動</td>
				<td>
					<p class='keyForAny' id='keyForLeft'>
						a
					</p>
				</td>
			</tr>
			<tr>
				<td>右移動</td>
				<td>
					<p class='keyForAny' id='keyForRight'>
						d
					</p>
				</td>
			</tr>
			<tr>
				<td>ソフトドロップ</td>
				<td>
					<p class='keyForAny' id='keyForSoftDrop'>
						s
					</p>
				</td>
			</tr>
			<tr>
				<td>ハードドロップ</td>
				<td>
					<p class='keyForAny' id='keyForHardDrop'>
						w
					</p>
				</td>
			</tr>
			<tr>
				<td>左回転</td>
				<td>
					<p class='keyForAny' id='keyForLeftRotation'>
						ArrowLeft
					</p>
				</td>
			</tr>
			<tr>
				<td>右回転</td>
				<td>
					<p class='keyForAny' id='keyForRightRotation'>
						ArrowRight
					</p>
				</td>
			</tr>
			<tr>
				<td>ホールド</td>
				<td>
					<p class='keyForAny' id='keyForHold'>
						Shift
					</p>
				</td>
			</tr>
		</table>
	`
	return text;
}

//
//
// フィールド
//
//

// function clearField(): void {
// 	console.log(currentTetris);
	
// 	currentTetris.resetField();
// 	currentTetris.displayAllMinos();
// }



//function setMinosStyle(): void {
//	for (const mino of TetriminoEnum.defArray) {
//		$('.'+mino+'Minos.placedMinos').css(gameRuleOption.currentOption.getStyle(mino));
//		$('.'+mino+'Minos.fallingMinos').css(gameRuleOption.currentOption.getStyleFalling(mino));
//		console.log(`style is ${JSON.stringify(gameRuleOption.currentOption.getStyleFalling(mino))} and ${JSON.stringify(gameRuleOption.currentOption.getStyle(mino))}`);
//	}
//}

function setSizeOfMatrix() {
	//$(':root').style.setProperty()
	setCssVar('--heightOfMatrix', gameRuleOption.currentOption.matrixHeight.toString());
	setCssVar('--widthOfMatrix', gameRuleOption.currentOption.matrixWidth.toString());
	if (hasTouchScreen()){
		const sizeOfMino = 15 * 10 / gameRuleOption.currentOption.matrixWidth;
		//console.log(gameRuleOption.currentOption.matrixWidth,`sizeOfMino is ${sizeOfMino}`);
		setCssVar('--sizeOfMino', sizeOfMino + 'px');
	}
}



function displayButtonsToOperate(): void {
	$('#buttonsToOperateArea').html(textOfButtonsToOperate);
}
function hideButtonsToOperate(): void {
	$('#buttonsToOperateArea').html('');
}

function textOfButtonsToOperate(): string {
	let text = '';
	text += `
		<button class='buttonsToOperate' data-operate='left'></button>
		<button class='buttonsToOperate' data-operate='right'></button>
		<button class='buttonsToOperate' data-operate='softDrop'></button>
		<button class='buttonsToOperate' data-operate='hardDrop'></button>
		<button class='buttonsToOperate' data-operate='leftRotation'></button>
		<button class='buttonsToOperate' data-operate='rightRotation'></button>
		<button class='buttonsToOperate' data-operate='hold'>Hold</button>
	`;
	//text += `
	//	<button class='buttonsToOperate' data-operate='left'><img src='imgs/right.png'></button>
	//	<button class='buttonsToOperate' data-operate='right'><img src='imgs/right.png'></button>
	//	<button class='buttonsToOperate' data-operate='softDrop'><img src='imgs/right.png'></button>
	//	<button class='buttonsToOperate' data-operate='hardDrop'><img src='imgs/right-double.png'></button>
	//	<button class='buttonsToOperate' data-operate='leftRotation'><img src='imgs/leftRotation.png'></button>
	//	<button class='buttonsToOperate' data-operate='rightRotation'><img src='imgs/rightRotation.png'></button>
	//	<button class='buttonsToOperate' data-operate='hold'>Hold</button>
	//`;
	return text;
}

// function displayNext(): void {
// 	$('#nextArea').html(textOfNext())
// }

// function textOfNext(): string {
// 	let text = "<p id='nextHead'>Next</p>";
// 	for (let i = 0; i < gameRuleOption.currentOption.nextNum; i++) {
// 		if(typeof currentTetris.bag[i] !== 'undefined') {
// 			text += textOfMinoAlone(currentTetris.bag[i] as Tetrimino);
// 		}
// 	}
// 	return text;
// }

// function displayHold(): void {
// 	$('#holdArea').html(textOfHold())
// }

// function textOfHold(): string {
// 	const hold = currentTetris.holdMinoType;
// 	if (TetriminoNormal.isTetrimino(hold)) {
// 		let text = "<p id='holdHead'>hold</p>"+textOfMinoAlone(hold);
// 		return text;
// 	} else {
// 		return "";
// 	}
// }

// function textOfMinoAlone(type: Tetrimino): string {
// 	// console.log(type);
// 	let text = "<div class='displayers'>";
// 	if (!type || type=='empty') {
// 		for (var i = 0; i < 8; i++) {
// 			text += '<div class="minos emptyMinos"></div>'
// 		}
// 		text + '</div>'
// 		return text;
// 	}

// 	const shape =  gameRuleOption.currentOption.tetriminoClass.skeltonMap.get(type);
// 	if (typeof shape !== 'undefined') {
// 		const shape_defined = shape as number[][];
// 		for (let line of shape_defined) {
// 			if (type != 'i') {
// 				if (type == 'o') {
// 					text += '<div class="minos emptyMinos"></div>'
// 					text += '<div class="minos emptyMinos"></div>'
// 				} else {
// 					text += '<div class="minos emptyMinos"></div>'
// 				}
// 			}
// 			for (let tile of line) {
// 				if (tile==-1) {
// 					text += '<div class="minos emptyMinos"></div>'
// 				} else {
// 					text += '<div class="minos '+type+'Minos"></div>'
// 				}
// 			}
// 		}
// 	}
// 	if (type=='i') {
// 		text += '<div class="minos emptyMinos"></div><div class="minos emptyMinos"></div><div class="minos emptyMinos"></div><div class="minos emptyMinos"></div>'
// 	}
// 	text += '</div>'
// 	return text;
// }

function displayScoreArea(): void {
	$('#scoreArea').html(textOfScoreArea())
}

function textOfScoreArea(): string {
	let text = ''
	// scoring.forEach((val,key) => {
	// 	text += DisplayTitleOfAction.get(key)+":"+scoring.get(key)+"<br>"
	// })
	return text;
}

function clearHoldArea():void {
	$('#holdArea').html('')
}

function clearNextArea(): void {
	$('#nextArea').html('')
}

function clearScoreArea(): void {
	$('#scoreArea').html('')
}
