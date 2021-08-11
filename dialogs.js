function initDialogs() {
	$('.dialogs').each((i, obj) => {
		console.log(i,obj);
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
		buttons: {
			'restart': function () {
				reset();
				startToAppearMinos();
				$(this).dialog('close');
			},
			'toMainMenu': function () {
				displayMainMenu();
				$(this).dialog('close');
			}
		}
	})
})