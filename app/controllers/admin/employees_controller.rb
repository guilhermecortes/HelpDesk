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

        respond_to do |format|
            if @employee.save
                flash[:info] = 'Funcionário criado com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { render action: 'index', status: :created, location: @employee }
            else
                flash[:alert] = "Ocorreu um erro ao salvar. #{@employee.errors.full_messages.to_sentence}"
                format.html { redirect_to action: 'new' }
                format.json { render json: @employee.errors, status: :unprocessable_entity}
            end
        end

    end

    def update
        respond_to do |format|
            if @employee.update(employee_params)
                flash[:info] = 'Funcionário atualizado com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { head :no_content }
            else
                flash[:alert] = "Ocorreu um erro ao salvar. #{@employee.errors.full_messages.to_sentence}"
                format.html { render action: 'edit' }
                format.json { render json: @employee.errors, status: :unprocessable_entity }
            end
        end
    end

    def destroy
        respond_to do |format|
            if @employee.destroy
                flash[:info] = 'Funcionário excluído com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { head :no_content }
            else
                flash[:alert] = "Ocorreu um erro ao salvar. #{@employee.errors.full_messages.to_sentence}"
                format.html { render action: 'index' }
                format.json { render json: @employee.errors, status: :unprocessable_entity }
            end
        end
    end

    private

    def set_employee
        @employee = Admin::Employee.find(params[:id])
    end

    def employee_params
        params.require(:admin_employee).permit(:name, :registration, :admin_grupo_id, :roles_mask, :post, :salary)
    end

end