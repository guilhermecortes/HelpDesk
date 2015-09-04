class Admin::EmployeesController < ApplicationController

    before_action :set_employee, only: [:edit, :update, :destroy]
    load_and_authorize_resource

    def index
        @employees = Admin::Employee.select('id, name, registration, admin_grupo_id, post, salary').all
    end

    def new
        @employee = Admin::Employee.new
    end

    def edit
    end

    def create
        @employee = Admin::Employee.new(employee_params)
        respond_with @employee, location: @employee.save ? admin_employees_path : new_admin_employee_path(@employee)
    end

    def update
        respond_with @employee, location: @employee.update(employee_params) ? admin_employees_path : edit_admin_employee_path(@employee)
    end

    def destroy
        respond_with @employee, location: admin_employees_path if @employee.destroy
    end

    private

    def set_employee
        @employee = Admin::Employee.find(params[:id])
    end

    def employee_params
        params.require(:admin_employee).permit(:name, :registration, :admin_grupo_id, :roles_mask, :post, :salary)
    end

end