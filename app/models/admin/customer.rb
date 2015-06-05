class Admin::Customer < ActiveRecord::Base

    validates :name, :presence => {:message => "Campo obrigatório"}
    validates :responsible, :presence => {:message => "Campo obrigatório"}
    validates :active, :inclusion => {:in => [true, false]}
    validates :hours, :presence => {:message => "Campo obrigatório"}
    validates :phone1, :presence => {:message => "Campo obrigatório"}

end
