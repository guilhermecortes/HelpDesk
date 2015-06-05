class SessionsController < Devise::SessionsController

	prepend_before_filter :require_no_authentication, only: [ :new, :create, :createLogin ]
	prepend_before_filter :allow_params_authentication!, only: [ :create, :createLogin ]

	def create
		super
	end

	def login
		#método new da classe mãe
		self.resource = resource_class.new(sign_in_params)
		clean_up_passwords(resource)
		yield resource if block_given?
		# respond_with(resource, serialize_options(resource))
		render :layout => "website"
	end

	def create_login
		# p "-------------------------------------- #{request.referer}"
		auth_options = { :recall => 'sessions#login', :scope => :user } #adicionado para alterar a rota se login for incorreto
		self.resource = warden.authenticate!(auth_options)
		set_flash_message(:notice, :signed_in) if is_flashing_format?
		sign_in(resource_name, resource)
		yield resource if block_given?
		# redirect_to '/minha-conta'
		respond_with resource, location: after_sign_in_path_for(resource)
	end

end
