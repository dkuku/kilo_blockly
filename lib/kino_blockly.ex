defmodule KinoBlockly do
  use Kino.JS, assets_path: "lib/assets"
  use Kino.JS.Live
  use Kino.SmartCell, name: "Blockly"

  def new(toolbox) do
    Kino.JS.new(__MODULE__, toolbox)
  end

    @impl true
  def init(attrs, ctx) do
    source = attrs["source"] || ""
    {:ok, assign(ctx, source: source)}
  end

  @impl true
  def handle_connect(ctx) do
    {:ok, %{source: ctx.assigns.source}, ctx}
  end

  @impl true
  def handle_event("update", %{"source" => source}, ctx) do
    broadcast_event(ctx, "update", %{"source" => source})
    {:noreply, assign(ctx, source: source)}
  end

  @impl true
  def to_attrs(ctx) do
    %{"source" => ctx.assigns.source}
  end

  @impl true
  def to_source(attrs) do
    attrs["source"]
  end
end
