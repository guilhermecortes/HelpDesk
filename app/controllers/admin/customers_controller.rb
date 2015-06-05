class Admin::CustomersController < ApplicationController

    before_action :set_customer, only: [:edit, :update, :destroy]
    load_and_authorize_resource

    def index
        @customers = Admin::Customer.select('id, name, responsible, active, hours, phone1, phone2, address').all
    end

    def new
        @customer = Admin::Customer.new
    end


    def edit
    end


    def create
        @customer = Admin::Customer.new(customer_params)

        respond_to do |format|
            if @customer.save
                flash[:info] = 'Cliente criado com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { render action: 'index', status: :created, location: @customer }
            else
                flash[:alert] = "Ocorreu um erro ao salvar. #{@customer.errors.full_messages.to_sentence}"
                format.html { redirect_to action: 'new' }
                format.json { render json: @customer.errors, status: :unprocessable_entity}
            end
        end

    end

    def update
        respond_to do |format|
            if @customer.update(customer_params)
                flash[:info] = 'Cliente atualizado com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { head :no_content }
            else
                flash[:alert] = "Ocorreu um erro ao salvar. #{@customer.errors.full_messages.to_sentence}"
                format.html { render action: 'edit' }
                format.json { render json: @customer.errors, status: :unprocessable_entity }
            end
        end
    end

    def destroy
        respond_to do |format|
            if @customer.destroy
                flash[:info] = 'Cliente excluído com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { head :no_content }
            else
                flash[:alert] = "Ocorreu um erro ao salvar. #{@customer.errors.full_messages.to_sentence}"
                format.html { render action: 'index' }
                format.json { render json: @customer.errors, status: :unprocessable_entity }
            end
        end
    end

    private

    def set_customer
        @customer = Admin::Customer.find(params[:id])
    end

    def customer_params
        params.require(:admin_customer).permit(:name, :responsible, :active, :hours, :phone1, :phone2, :address)
    end


end
