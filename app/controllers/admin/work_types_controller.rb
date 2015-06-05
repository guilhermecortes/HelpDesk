class Admin::WorkTypesController < ApplicationController

    before_action :set_work_type, only: [:edit, :destroy]
    load_and_authorize_resource

    def index
        @work_types = Admin::WorkType.select('id, name').all
    end

    def new
        @work_type = Admin::WorkType.new
    end


    def edit
    end


    def create
        @work_type = Admin::WorkType.new(work_type_params)

        respond_to do |format|
            if @work_type.save
                flash[:info] = 'Tipo de trabalho criado com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { render action: 'index', status: :created, location: @work_type }
            else
                format.html { render action: 'new' }
                format.json { render json: @work_type.errors, status: :unprocessable_entity}
            end
        end

    end

    def update
        respond_to do |format|
            if @work_type.update(work_type_params)
                flash[:info] = 'Tipo de trabalho atualizado com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { head :no_content }
            else
                format.html { render action: 'edit' }
                format.json { render json: @work_type.errors, status: :unprocessable_entity }
            end
        end
    end

    def destroy
        respond_to do |format|
            if @work_type.destroy
                flash[:info] = 'Tipo de trabalho excluído com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { head :no_content }
            else
                format.html { render action: 'index' }
                format.json { render json: @work_type.errors, status: :unprocessable_entity }
            end
        end
    end

    private

    def set_work_type
        @work_type = Admin::WorkType.find(params[:id])
    end

    def work_type_params
        params.require(:admin_work_type).permit(:name)
    end



end
