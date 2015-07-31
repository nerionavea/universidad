require 'sinatra'
require 'rubygems'
require 'haml'
require 'pony'
require 'rufus-scheduler'
require 'dm-core'
require 'dm-migrations'
require 'savon'
require 'sinatra/flash'

Dir["./app/**/*.rb"].each do |file|
    require file
end

configure do
  DataMapper.setup(:default, (ENV["DATABASE_URL"] || "sqlite3:///#{Dir.pwd}/development.sqlite3"))
  DataMapper.auto_migrate!
  DataMapper.auto_upgrade!
end


set :views, Proc.new { File.join(root, "app/views") }