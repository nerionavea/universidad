DataMapper::Property::String.length(1000)
class User
	include DataMapper::Resource
	property :id, Serial
	property :nick, String
	property :password, String
	property :active, Boolean, :default => true

	def self.authenticate(login)
    user = User.first(:nick => login[:nick])
    if user == nil
   		false
    else
    	user.password == login[:password] ? user : false
    end
    end
end

class Customer
	include DataMapper::Resource
	property :id, Serial
	property :identification, String
	property :first_name, String
	property :last_name, String
	property :saldo_deuda, String, :default => '0'
	has n, :transactions
end

class Transaction
	include DataMapper::Resource
	property :id, Serial
	property :fecha, Date
	property :venta, String
	property :abono, String
	property :saldo, String
	belongs_to :customer
end
