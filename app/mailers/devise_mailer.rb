class DeviseMailer < Devise::Mailer

    helper :application
    include Devise::Controllers::UrlHelpers

    default from: "no-reply@helpdesk.com.br"

    def reset_password_instructions(record, token, opts={})
        mail = super
        # your custom logic
        mail.subject = "Instruções para alterar senha"
        mail.from = "HelpDesk <no-reply@helpdesk.com.br>"
        mail
    end


end
