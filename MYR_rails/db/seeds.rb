# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#http://stackoverflow.com/questions/10301794/difference-between-rake-dbmigrate-dbreset-and-dbschemaload
Member.create!(name:  "testAdmin",
               email: "example@gmail.com",
               password:              "foobar",
               password_confirmation: "foobar",
               role:     'administrator',
               activated: true,
               activated_at: Time.zone.now)

10.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@gmail.com"
  password = "password"
  Member.create!(name:  name,
                 email: email,
                 password:              password,
                 password_confirmation: password,
                 role:     'visitor',
                 activated: true,
                 activated_at: Time.zone.now)
end

i=1
20.times do |n|
	token=i
	Tracker.create!(token:  "#{i}",
             		  description: "It was the #{i} tracker.")
  i=i+1
end

#Mission 1
Mission.create!(name:  "Triangular Course Contest",
								start: "20150601000000",
								end:   "20150801000000",
             		description: "It was the first mission.")

#Mission 2
Mission.create!(name:  "Station-Keeping Contest",
								start: "20150601000000",
								end:   "20150801000000",
             		description: "It was the second mission")
             		
#Mission 3
Mission.create!(name:  "Area Scanning Contest",
								start: "20150601000000",
								end:   "20150801000000",
             		description: "It was the third mission")
#Mission 4
Mission.create!(name:  "Fleet Race",
								start: "20150601000000",
								end:   "20150801000000",
             		description: "It was the fourth mission")

#team 1
Team.create!(name:  "Zombie",
             description: "root test for zombies",
             leader_id: 1)

#robot1 
Robot.create!(name:  "Zombie1",
              category: "Small",
              team_id: 1)
              
#robot2 
Robot.create!(name:  "Zombie2",
              category: "Small",
              team_id: 1)
              
#robot3 
Robot.create!(name:  "Zombie3",
              category: "Small",
              team_id: 1)
#team 2        
Team.create!(name: "Pizza",
						 description: "root test for pizzas",
						 leader_id: 1)    
						 
#robot4 
Robot.create!(name:  "Pizza1",
              category: "Small",
              team_id: 2)
              
#robot5 
Robot.create!(name:  "Pizza2",
              category: "Small",
              team_id: 2)
              
#robot6 
Robot.create!(name:  "Pizza3",
              category: "Small",
              team_id: 2) 	 

#team 3						 
Team.create!(name: "just for fun",
						 description: "root test for just for fun",
						 leader_id: 1)   

#robot7 
Robot.create!(name:  "just for fun1",
              category: "Small",
              team_id: 3)
              
#robot8 
Robot.create!(name:  "just for fun2",
              category: "Small",
              team_id: 3)
              
#robot9 
Robot.create!(name:  "just for fun3",
              category: "Small",
              team_id: 3) 	 


