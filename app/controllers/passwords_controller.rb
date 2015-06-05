class PasswordsController < Devise::PasswordsController

    def new
        super
    end

    def create
        self.resource = resource_class.send_reset_password_instructions(resource_params)

        if successfully_sent?(resource)
            # redirect_to root_path, :notice => "Instruction has been send to your email"
            # flash[:notice] = 'Instruções enviadas para seu e-mail'
            flash[:password_change] = 'Instruções enviadas para seu e-mail'
            redirect_to new_user_session_path
            # redirect_to '/home'
        else
            flash[:notice] = 'Erro ao enviar instruções enviadas para seu e-mail'
            respond_with(resource)
        end
    end

    def edit
        super
    end

    def update
        self.resource = resource_class.reset_password_by_token(resource_params)

        if resource.errors.empty?
            resource.unlock_access! if unlockable?(resource)
            flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
            set_flash_message(:notice, flash_message) if is_navigational_format?
            sign_in(resource_name, resource)
            #TODO alterar
            # redirect_to minha_conta_path, :notice => "Password has been change"
            redirect_to admin_usuarios_path, :notice => "Password has been change"
        else
            respond_with resource
        end
    end

    protected

    def after_sending_reset_password_instructions_path_for(resource_name)
        root_path
    end

    def assert_reset_token_passed
        super
    end

    def unlockable?(resource)
        super
    end

end
