$(document).ready(function(){
	function Change_id_type(id_type){
		$('#dropdown-tipo-de-identificacion').html(id_type + '\n <span class="caret"></span>');
	}
	function ajaxPostCustomer(){
		$.ajax({
			url: '/customers/ajax_post_customer',
			data: {identification: $('#input_cedula').val()},
			type: 'POST',
			success: function(json){
				console.log('Recibido valores ' + json.first_name + ' ' + json.last_name);
				$('#form_nombre').val(json.first_name);
				$('#form_apellido').val(json.last_name);
				disableNameAndLastNameInput();
			}
		})
	}
	function createCustomer() {
		console.log('Creating customer');
		$.ajax({
			url: '/customers/create_customer',
			type: 'POST',
			data: {'customer[identification]': $('#input_cedula').val(),
			'customer[first_name]': $('#form_nombre').val(),
			'customer[last_name]': $('#form_apellido').val()
			},
			success: function(result){
				$('#table_transactions').empty();
				$('#table_transactions').html(result);
			}
		})	
	}
	function reloadTableTransactions(){
		$.ajax({
			url: '/customers/transactions',
			type: 'POST',
			data: {identification: $('#input_cedula').val()
			},
			success: function(result){
				$('#table_transactions').empty();
				$('#table_transactions').html(result);
				console.log('Puesto el valor del html');
			}
		})	
	}
	function disableNameAndLastNameInput(){
		$('#form_nombre').attr('disabled',true);
		$('#form_apellido').attr('disabled', true);
		$('#guardar_cliente').attr('disabled', true);
	}
	function ResetFirstAndLastName(){
		console.log('Reseteando customer form');
		$('#form_nombre').val('');
		$('#form_nombre').removeAttr('disabled',true);
		$('#form_apellido').val('');
		$('#form_apellido').removeAttr('disabled', true);
		$('#guardar_cliente').removeAttr('disabled', true);
	}
	function ajaxCreateTransaction(){
		console.log('Creating transactions');
		$.ajax({
			url: '/customers/create_transaction',
			type: 'POST',
			data: {identification: $('#input_cedula').val(),
			venta: $('#input_venta').val(),
			abono: $('#input_abono').val()
			},
			success: function(result){
				console.log('Enviada Transaccion al servidor');
			}
		})		
	}
	function resetTransactionForm(){
		$('#input_venta').val('');
		$('#input_abono').val('');
	}
	$('#guardar_transaccion').click(function(){
		ajaxCreateTransaction();
		reloadTableTransactions();
		resetTransactionForm();
	})
	$('#guardar_cliente').click(function(){
		disableNameAndLastNameInput();
		createCustomer();
		reloadTableTransactions();
	})
	$('#input_cedula').change(function(){
		ResetFirstAndLastName();
		ajaxPostCustomer();
		reloadTableTransactions();
	})
    $('[data-toggle="tooltip"]').tooltip();
	$('#selectv').click(function(){
		Change_id_type('V');
		console.log('atributo cambiado');
	})
	$('#selectj').click(function(){
		Change_id_type('J');
		console.log('atributo cambiado');
	})
	$('#selectg').click(function(){
		Change_id_type('G');
		console.log('atributo cambiado');
	})
	$('#selecte').click(function(){
		Change_id_type('E');
		console.log('atributo cambiado');
	})
	$('#print').click(function (){$('div#table_transactions').printArea();})

})