class Admin::WorkType < ActiveRecord::Base

    validates :name, :presence => {:message => "Campo obrigatório"}

    has_many :admin_tickets, :class_name => "Admin::Ticket"

end
