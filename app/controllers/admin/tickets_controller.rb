class Admin::TicketsController < ApplicationController

    before_action :set_ticket, only: [:edit, :update, :destroy]
    load_and_authorize_resource

    def index
        @tickets = Admin::Ticket.all
    end

    def new
        @ticket = Admin::Ticket.new
    end


    def edit
    end


    def create
        @ticket = Admin::Ticket.new(ticket_params)

        respond_to do |format|
            if @ticket.save
                flash[:info] = 'Ticket criado com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { render action: 'index', status: :created, location: @ticket }
            else
                flash[:alert] = "Ocorreu um erro ao salvar. #{@ticket.errors.full_messages.to_sentence}"
                format.html { redirect_to action: 'new' }
                format.json { render json: @ticket.errors, status: :unprocessable_entity}
            end
        end

    end

    def update
        respond_to do |format|
            if @ticket.update(ticket_params)
                flash[:info] = 'Ticket atualizado com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { head :no_content }
            else
                flash[:alert] = "Ocorreu um erro ao salvar. #{@ticket.errors.full_messages.to_sentence}"
                format.html { render action: 'edit' }
                format.json { render json: @ticket.errors, status: :unprocessable_entity }
            end
        end
    end

    def destroy
        respond_to do |format|
            if @ticket.destroy
                flash[:info] = 'Ticket excluído com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { head :no_content }
            else
                flash[:alert] = "Ocorreu um erro ao salvar. #{@ticket.errors.full_messages.to_sentence}"
                format.html { render action: 'index' }
                format.json { render json: @ticket.errors, status: :unprocessable_entity }
            end
        end
    end

    private

    def set_ticket
        @ticket = Admin::Ticket.find(params[:id])
    end

    def ticket_params
        params.require(:admin_ticket).permit(:subject,
                                            :content,
                                            :user_id,
                                            :status,
                                            :priority,
                                            :delivery_date,
                                            :admin_category_id,
                                            :admin_work_type_id,
                                            :planned)
    end

end
