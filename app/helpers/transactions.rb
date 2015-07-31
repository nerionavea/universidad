require 'sinatra/base'

module Sinatra
	module Transactions
		module Helpers
			def calculate_saldo
				if @customer.transactions.last!					
					0 + params[:venta] - params[:abono]
				else
					@customer.transactions.last.saldo + params[:venta] - params[:abono]
				end
			end
		end

		def self.registered(app)
			app.helpers Helpers

			app.get '/customer/save_transaction' do
				test
			end
			app.post '/customers/create_customer' do
				@customer = Customer.create(params[:customer])
				haml :table_transactions, :layout => (request.xhr? ? false : :layout) 
			end
			app.post '/customers/transactions' do
				@customer = Customer.first(:identification => params[:identification])
				if @customer != nil
					@transactions = @customer.transactions.all
					haml :table_transactions, :layout => (request.xhr? ? false : :layout)
				end
			end
			app.post '/customers/ajax_post_customer' do
				customer = Customer.first(:identification => params[:identification])
				content_type :json
				if customer != nil
					{:first_name => customer.first_name, :last_name => customer.last_name}.to_json
				end
			end

			app.post '/customers/create_transaction' do
				customer = Customer.first(:identification => params[:identification])
				ultima_transaccion = customer.transactions.last
				if ultima_transaccion != nil
					nuevo_saldo = ultima_transaccion.saldo.to_i + params[:venta].to_i - params[:abono].to_i
				else
					nuevo_saldo = params[:venta].to_i - params[:abono].to_i
				end
				customer.transactions.create(:fecha => Time.now, :venta => params[:venta], :abono => params[:abono], :saldo => nuevo_saldo)
			end
			app.get '/reportes/ventas' do
				@customers = Customer.all
				haml :reporte_ventas
			end

			app.get '/reportes/abonos' do
				@customers = Customer.all
				haml :reporte_abonos
			end

			app.get '/reportes/saldos' do
				@customers = Customer.all
				haml :reporte_saldo
			end
		end
	end
	register Transactions
end