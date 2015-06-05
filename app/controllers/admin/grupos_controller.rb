class Admin::GruposController < ApplicationController

  before_action :set_grupo, only: [:edit, :destroy]
  load_and_authorize_resource

  def index
    @grupos = Admin::Grupo.select('id, nome, custo_total').all
  end

  def new
    @grupo = Admin::Grupo.new
  end


  def edit
  end


  def create
    @grupo = Admin::Grupo.new(grupo_params)

    respond_to do |format|
      if @grupo.save
        flash[:info] = 'Grupo criado com sucesso'
        format.html { redirect_to action: 'index' }
        format.json { render action: 'index', status: :created, location: @grupo }
      else
        format.html { render action: 'new' }
        format.json { render json: @grupo.errors, status: :unprocessable_entity}
      end
    end

  end

  def update
    respond_to do |format|
      if @grupo.update(grupo_params)
        flash[:info] = 'Grupo atualizado com sucesso'
        format.html { redirect_to action: 'index' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @grupo.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @grupo.destroy
        flash[:info] = 'Grupo excluído com sucesso'
        format.html { redirect_to action: 'index' }
        format.json { head :no_content }
      else
        format.html { render action: 'index' }
        format.json { render json: @grupo.errors, status: :unprocessable_entity }
      end
    end
  end

  private

    def set_grupo
      @grupo = Admin::Grupo.find(params[:id])
    end

    def grupo_params
      params.require(:admin_grupo).permit(:nome, :custo_total)
    end


end
