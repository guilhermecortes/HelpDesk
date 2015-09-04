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
        respond_with @ticket, location: @ticket.save ? admin_tickets_path : new_admin_ticket_path(@ticket)
    end

    def update
        respond_with @ticket, location: @ticket.update(ticket_params) ? admin_tickets_path : edit_admin_ticket_path(@ticket)
    end

    def destroy
        respond_with @ticket, location: admin_tickets_path if @ticket.destroy
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
