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
    respond_with @grupo, location: @grupo.save ? admin_grupos_path : new_admin_grupo_path(@grupo)
  end

  def update
    respond_with @grupo, location: @grupo.update(grupo_params) ? admin_grupos_path : edit_admin_grupo_path(@grupo)
  end

  def destroy
    respond_with @grupo, location: admin_grupos_path if @grupo.destroy
  end

  private

    def set_grupo
      @grupo = Admin::Grupo.find(params[:id])
    end

    def grupo_params
      params.require(:admin_grupo).permit(:nome, :custo_total)
    end


end
