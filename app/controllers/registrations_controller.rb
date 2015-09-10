class RegistrationsController < Devise::RegistrationsController
	# load_and_authorize_resource
	skip_before_filter :require_no_authentication, :only => [:create]
	# prepend_before_filter :authenticate_scope!, only: [:edit, :update, :destroy, :updateUser]

	# def create_nova_conta
	#     build_resource(sign_up_params)
	#     resource.roles_mask = 4 #role de 'usuario'
	#     resource_saved = resource.save
	#     yield resource if block_given?
	#     if resource_saved
	#       @endereco = Endereco.new(endereco_params)
	#       @endereco.user_id = resource.id
	#       if @endereco.save
	# 	      if resource.active_for_authentication?
	# 	        set_flash_message :notice, :signed_up if is_flashing_format?
	# 	        sign_up(resource_name, resource)
	# 	        # respond_with resource, location: after_sign_up_path_for(resource)
	# 	        redirect_to '/minha-conta'
	# 	      else
	# 	        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_flashing_format?
	# 	        expire_data_after_sign_in!
	# 	        redirect_to '/login'
	# 	        # respond_with resource, location: after_inactive_sign_up_path_for(resource)
	# 	      end
	# 	  end
	#     else
	#       clean_up_passwords resource
	#       if User.exists?(email: params[:user][:email])
	#       	flash[:notice] = 'E-mail já existente em nossa base de dados.'
	#       else
	#       	flash[:notice] = 'Desculpe, ocorreu um erro durante o cadastro.'
	#       end
	#       redirect_to '/nova-conta'
	#       # respond_with resource
	#     end
	# end

	def create
		# super
		build_resource(sign_up_params)
		resource_saved = resource.save
		yield resource if block_given?
		if resource_saved
			active_message_and_redirect resource
		else
		  clean_up_passwords resource
		  respond_with resource
		end
	end

	def active_message_and_redirect resource
		if resource.active_for_authentication?
			set_flash_message :notice, :signed_up if is_flashing_format?
			flash[:estado] = "Inserido-sucesso"
			redirect_to admin_usuarios_path
		else
			set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_flashing_format?
			expire_data_after_sign_in!
			respond_with resource, location: after_inactive_sign_up_path_for(resource)
		end
	end

	def update
		account_update_params = devise_parameter_sanitizer.sanitize(:account_update)

		# required for settings form to submit when password is left blank
		if account_update_params[:password].blank?
			account_update_params.delete("password")
			account_update_params.delete("password_confirmation")
		end

		@user = User.find(params[:user]['id'])

		if @user.update_attributes(account_update_params)
			set_flash_message :notice, :updated
			flash[:estado] = "Atualizado-sucesso"
			redirect_to admin_usuarios_path
			# redirect_to after_update_path_for(@user)
		else

			redirect_to edit_user_registration_path(@user)
		end

	end

	# def update_user
	# 	account_update_params = devise_parameter_sanitizer.sanitize(:account_update)
	# 	# required for settings form to submit when password is left blank
	# 	if account_update_params[:password].blank?
	# 		account_update_params.delete("password")
	# 		account_update_params.delete("password_confirmation")
	# 	end
	# 	resource_updated = update_resource(resource, account_update_params)
	# 	yield resource if block_given?
	# 	if resource_updated
	# 		sign_in resource_name, resource, bypass: true
	# 		# respond_with resource, location: after_update_path_for(resource)
	# 		flash[:success] = 'Cadastro atualizado com sucesso.'
	# 		redirect_to :back
	# 	else
	# 		clean_up_passwords resource
	# 		# respond_with resource
	# 		flash[:erro] = resource.errors.full_messages
	# 		redirect_to "/minha-conta"
	# 	end
	# end

	# def busca_login
	# 	login = User.select("id, login").where("login = ?", "#{params[:buscaLogin]}")
	# 	render :json => login
	# end

	# private
    #
	# 	def endereco_params
	# 		params.require(:endereco).permit(:user_id, :nome, :logradouro, :numero, :complemento, :bairro, :cidade, :estado, :cep, :referencia)
	# 	end

end
