const blockyRoot = '<div id="blocklyDiv" style="height: 480px; width: 600px;"></div>'

export async function init(ctx, _init) {
    //await ctx.importJS("https://unpkg.com/blockly/blockly.min.js")
    await ctx.importJS("./package/blockly.min.js")
    ctx.root.innerHTML = blockyRoot;
    window.Blockly = Blockly;
    window.Elixir = new Blockly.Generator('elixir');
    window.workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox()});
    window.workspace.addChangeListener(() => generate(ctx));
}
function generate(ctx) {
    const Elixir = window.Elixir
    const workspace = window.workspace
    Elixir.addReservedWords('source');
    Elixir['text'] = function(block) {
    const code = block.getFieldValue('TEXT');
    return [`"${code}"`, 0];
  }
  Elixir['math_number'] = function(block) {
    const code = block.getFieldValue('NUM');
    return [`${code}`, 0];
  }
  Elixir['text_print'] = function(block) {
    const msg = Elixir.valueToCode(block, 'TEXT', 0) || '""';
    return `inspect(${msg})`;
  }
  const source = Elixir.workspaceToCode(workspace);
  ctx.pushEvent("update", { source });
}
function toolbox() {
  return {
    contents: [
      {kind: "block", type: "math_number"},
      {kind: "block", type: "text"},
      {kind: "block", type: "text_print"}
    ],
    kind: "flyoutToolbox"
  }
}

