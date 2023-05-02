defmodule KinoBlockly.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    Kino.SmartCell.register(KinoBlockly)

    children = []
    opts = [strategy: :one_for_one, name: KinoBlockly.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
