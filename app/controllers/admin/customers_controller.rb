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
        respond_with @customer, location: @customer.save ? admin_customers_path : new_admin_customer_path(@customer)
    end

    def update
        respond_with @customer, location: @customer.update(customer_params) ? admin_customers_path : edit_admin_customer_path(@customer)
    end

    def destroy
        respond_with @customer, location: admin_customers_path if @customer.destroy
    end

    private

    def set_customer
        @customer = Admin::Customer.find(params[:id])
    end

    def customer_params
        params.require(:admin_customer).permit(:name, :responsible, :active, :hours, :phone1, :phone2, :address)
    end


end
