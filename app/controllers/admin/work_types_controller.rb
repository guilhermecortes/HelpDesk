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
        respond_with @work_type, location: @work_type.save ? admin_work_types_path : new_admin_work_type_path(@work_type)
    end

    def update
        respond_with @work_type, location: @work_type.update(work_type_params) ? admin_work_types_path : edit_admin_work_type_path(@work_type)
    end

    def destroy
        respond_with @work_type, location: admin_work_types_path if @work_type.destroy
    end

    private

    def set_work_type
        @work_type = Admin::WorkType.find(params[:id])
    end

    def work_type_params
        params.require(:admin_work_type).permit(:name)
    end



end
