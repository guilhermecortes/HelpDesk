class Admin::Ticket < ActiveRecord::Base

    belongs_to :user
    belongs_to :admin_category, :class_name => 'Admin::Category'
    belongs_to :admin_work_type, :class_name => 'Admin::WorkType'

    validates :subject, :presence => {:message => "Campo obrigatório"}
    validates :status, :presence => {:message => "Campo obrigatório"}
    validates :priority, :presence => {:message => "Campo obrigatório"}
    validates :planned, :inclusion => {:in => [true, false]}
    validates_associated :user
    validates_associated :admin_category
    validates_associated :admin_work_type

end
