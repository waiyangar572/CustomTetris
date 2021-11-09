import { Enum } from "./general";

export class GameOption<T> {
	private _optionName: string;
	private _currentOption: T;
	private _enumOfT: Enum<T>;
	private _customElements: (op: string) => string;
	private _customFunc: (op: string) => void;

	constructor(name:string, indOfDefault: number=0, enumOfT: Enum<T>, customElements: (op: string) => string = () => "", customFunc: (op: string) => void = () => {}) {
		this._optionName = name;
		this._enumOfT = enumOfT;
		this._currentOption = this._enumOfT.defArray[indOfDefault];
		this._customElements = customElements;
		this._customFunc = customFunc;

		$(document).on('change', 'input[name="'+this._optionName+'"]', (e) => {
			const value = $('input[name="'+this._optionName+'"]:checked').val() as number;
			const value_T = this._enumOfT.defArray[value];
			//console.log(value);
			if (typeof value_T !== 'undefined') {
				this._currentOption = value_T;
			}
		})
	}

	get currentOption(): T {
		return this._currentOption;
	}

	get customFunc(): (op: string) => void {
		return this._customFunc;
	}

	displayRadioOption(obj: string): void {
		let htmlText = "<div id='"+this._optionName+"RadioContainer'>";
		for (let i = 0; i < this._enumOfT.defArray.length; i++) {
			const option = this._enumOfT.defArray[i];
			//console.log(this._enumOfT.toString(option));
			htmlText += `
				<div class='radio'>
					<input type='radio' name='${this._optionName}' value='${i}' id='${this._optionName}-${this._enumOfT.toString(option)}'>
					<label class='radio-label' for='${this._optionName}-${this._enumOfT.toString(option)}'>${this._enumOfT.getTitle(option)}</label>
					<button class='gameRuleInfo' id='${this._optionName}-info'>i</button>
					${this._customElements(this._enumOfT.toString(option))}
				</div>
			`
		}
		$(obj).append(htmlText);
		const currentIndex =this._enumOfT.defArray.lastIndexOf(this._currentOption).toString();
		//console.log(currentIndex);
		$(obj+' input[name="'+this._optionName+'"]').val([currentIndex]);
		$('.gameRuleInfo').off('click');
		$('.gameRuleInfo').on('click', (e) => {

		})
	}
}
