class Admin::CategoriesController < ApplicationController

    before_action :set_category, only: [:edit, :destroy]
    load_and_authorize_resource

    def index
        @categories = Admin::Category.select('id, name').all
    end

    def new
        @category = Admin::Category.new
    end

    def edit
    end

    def create
        @category = Admin::Category.new(category_params)
        respond_with @category, location: @category.save ? admin_categories_path : new_admin_category_path(@category)
    end

    def update
        respond_with @category, location: @category.update(category_params) ? admin_categories_path : edit_admin_category_path(@category)
    end

    def destroy
        respond_with @category, location: admin_categories_path if @category.destroy
    end

    private

    def set_category
        @category = Admin::Category.find(params[:id])
    end

    def category_params
        params.require(:admin_category).permit(:name)
    end


end
