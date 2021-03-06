class Coordinate < ActiveRecord::Base
# Associations
	belongs_to :tracker


# Validations
    validates :latitude, presence: true
    validates :longitude, presence: true
    validates :datetime, presence: true
    validates :tracker_id, presence: true
end

