class Admin::Employee < ActiveRecord::Base

    belongs_to :admin_grupo, :class_name => 'Admin::Grupo'

    validates_associated :admin_grupo
    validates :name, :presence => {:message => "Campo obrigatório"}
    validates :registration, :presence => {:message => "Campo obrigatório"}
    validates :roles_mask, :presence => {:message => "Campo obrigatório"}
    validates :post, :presence => {:message => "Campo obrigatório"}
    validates :salary, :presence => {:message => "Campo obrigatório"}


end
