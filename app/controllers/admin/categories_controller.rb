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

        respond_to do |format|
            if @category.save
                flash[:info] = 'Categoria criada com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { render action: 'index', status: :created, location: @category }
            else
                format.html { render action: 'new' }
                format.json { render json: @category.errors, status: :unprocessable_entity}
            end
        end

    end

    def update
        respond_to do |format|
            if @category.update(category_params)
                flash[:info] = 'Categoria atualizada com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { head :no_content }
            else
                format.html { render action: 'edit' }
                format.json { render json: @category.errors, status: :unprocessable_entity }
            end
        end
    end

    def destroy
        respond_to do |format|
            if @category.destroy
                flash[:info] = 'Categoria excluída com sucesso'
                format.html { redirect_to action: 'index' }
                format.json { head :no_content }
            else
                format.html { render action: 'index' }
                format.json { render json: @category.errors, status: :unprocessable_entity }
            end
        end
    end

    private

    def set_category
        @category = Admin::Category.find(params[:id])
    end

    def category_params
        params.require(:admin_category).permit(:name)
    end


end
