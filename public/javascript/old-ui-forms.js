$(document).ready(function(){

	function Change_id_type(id_type){
		$('#dropdown-tipo-de-identificacion').html(id_type + '\n <span class="caret"></span>');
	}
	function SearchCustomer(cedula){
		$.ajax({
			url: '/customers/ajax_find_customer',
			data: {identification: $('#input_cedula').val()},
			type: 'POST',
			success: function(json){
				console.log('Recibido valores ' + json.first_name + ' ' + json.last_name);
				$('#form_nombre').val(json.first_name);
				$('#form_apellido').val(json.last_name);
				disableNameAndLastNameInput();
				$('#input_submit_customer').focus();
			}
		})
	}
	function ajaxRequestListWhenCustomerExist() {
		$.ajax({
			url: '/customers/ajax_find_or_create_customer',
			type: 'POST',
			data: {'customer[identification]': $('#input_cedula').val(),
			'customer[first_name]': $('#form_nombre').val(),
			'customer[last_name]': $('#form_apellido').val()
			},
			success: function(result){
				$('#form-transacciones').empty();
				$('#form-transacciones').hide();
				$('#cuentas').html(result);
			}
		})	
	}
	function ResetFirstAndLastName(){
		console.log('Reseteando customer form');
		$('#form_nombre').val('');
		$('#form_nombre').removeAttr('disabled',true);
		$('#form_apellido').val('');
		$('#form_apellido').removeAttr('disabled', true);
		$('#cuentas').hide('fast');
		$('#form-transacciones').hide('fast');
	}
	function changeTransactionsList(result){
			console.log('Recibida comunicacion con el servidor');
			$('#cuentas').empty();
			$('#cuentas').hide();
			$('#cuentas').html(result).show('fast');
	}
	function showNewTransactionForm(){
		$.ajax({
			url: '/customers/ajax_form_transactions',
			type: 'GET',
			success: function(result){
				$('#form-transacciones').empty();
				$('#form-transacciones').hide();
				$('#form-transacciones').html(result).show('fast');
				$('#save_transaction').click(function(){
				send_transaction()
			})
			}
		})
	}
	function send_transaction(){
		$.ajax({
			url: '/customers/ajax_save_transaction',
			type: 'POST',
			data: {
				cedula: $('#input_cedula').val(),
				fecha: $('#input_fecha').val(),
				venta: $('#input_venta').val(),
				abono: $('#input_abono').val()
			},
			success: function(result){
				$('#form-transacciones').empty();
				$('#form-transacciones').hide();
				$('#cuentas').html(result);
			}
		})
	}
	function disableNameAndLastNameInput(){
		$('#form_nombre').attr('disabled',true);
		$('#form_apellido').attr('disabled', true);
	}
	$('#input_cedula').change(function(){
		ResetFirstAndLastName();
		SearchCustomer($('#input_cedula').val);
		console.log('enviado valor' + $('#input_cedula').val());
		ajaxRequestListWhenCustomerExist();
	})
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
	$('#form_clientes').ajaxForm({
		target: '#cuentas',
		success: function(result) {
			changeTransactionsList(result);
			disableNameAndLastNameInput();
			$('#add_transaction').click(function(){
				showNewTransactionForm()
			})
		}
	});
})