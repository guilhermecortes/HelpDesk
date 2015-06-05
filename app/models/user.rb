require 'role_model'

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :admin_tickets, :class_name => "Admin::Tickets"

  include RoleModel

  ROLES = %w[admin employee customer] #1 admin / 2 employee / 4 customer

  def roles=(roles)
      self.roles_mask = (roles & ROLES).map { |r| 2**ROLES.index(r) }.inject(0, :+)
  end

  def roles
      ROLES.reject do |r|
          ((roles_mask.to_i || 0) & 2**ROLES.index(r)).zero?
      end
  end

  def is?(role)
      roles.include?(role.to_s)
  end

  #método para verificar se o usuário está "ativo" ao logar
  def active_for_authentication?
      super and self.ativo == true
  end

end
