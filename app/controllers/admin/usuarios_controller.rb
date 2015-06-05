class Admin::UsuariosController < ApplicationController

    load_and_authorize_resource :class => User

    # GET /high_scores
    # GET /high_scores.json
    def index
        @users = User.all
    end

    # GET /high_scores/1
    # GET /high_scores/1.json
    def show
    end

    # GET /high_scores/new
    def new
        @user = User.new
    end

    # GET /high_scores/1/edit
    def edit
        @resource = User.find(params[:id])
    end

    def destroy
        @user = User.find(params[:id])
        respond_to do |format|
            if @user.destroy
                flash[:estado] = "Excluído-sucesso"
                format.html { redirect_to action: 'index' }
                format.json { head :no_content }
            end
        end
    end

end
