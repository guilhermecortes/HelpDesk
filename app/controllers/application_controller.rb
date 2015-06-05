class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  before_filter :authenticate_user!


  rescue_from CanCan::AccessDenied do | exception |
    redirect_to '/home?autorizacao-negada'
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:email, :password, :password_confirmation, :nome, :ativo, :roles_mask) }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:email, :password, :nome, :ativo) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:email, :password, :password_confirmation, :id, :nome, :ativo, :roles_mask) }
  end

end
