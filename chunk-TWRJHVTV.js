import{$ as le,A as ge,B as ve,C as _e,D as v,F as be,G as ae,J as b,L as je,M as p,P as qe,Q as A,R as $e,V as m,X as O,Y as ye,a as h,aa as Te,b as w,ba as ue,c as te,f as a,g as T,h as U,i as _,j as We,k as g,ka as de,l as S,m as re,ma as M,na as Ke,o as se,oa as ke,p as k,pa as ce,qa as Ye,r as ne,ra as Xe,s as C,sa as Ce,t as ie,w as Ve,x as oe,y as Ne}from"./chunk-7I4YPTAY.js";var we=[];T.handleByNamedList(a.Environment,we);async function Je(n){if(!n)for(let e=0;e<we.length;e++){let t=we[e];if(t.value.test()){await t.value.load();return}}}var D;function he(){if(typeof D=="boolean")return D;try{D=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{D=!1}return D}var y=(n=>(n[n.NONE=0]="NONE",n[n.COLOR=16384]="COLOR",n[n.STENCIL=1024]="STENCIL",n[n.DEPTH=256]="DEPTH",n[n.COLOR_DEPTH=16640]="COLOR_DEPTH",n[n.COLOR_STENCIL=17408]="COLOR_STENCIL",n[n.DEPTH_STENCIL=1280]="DEPTH_STENCIL",n[n.ALL=17664]="ALL",n))(y||{});var P=class{constructor(e){this.items=[],this._name=e}emit(e,t,r,s,i,o,u,l){let{name:d,items:c}=this;for(let f=0,x=c.length;f<x;f++)c[f][d](e,t,r,s,i,o,u,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){let t=this.items.indexOf(e);return t!==-1&&this.items.splice(t,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}};var Gt=["init","destroy","contextChange","resolutionChange","reset","renderEnd","renderStart","render","update","postrender","prerender"],Bt=(()=>{let n=class Qe extends U{constructor(t){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=t.type,this.name=t.name,this.config=t;let r=[...Gt,...this.config.runners??[]];this._addRunners(...r),this._unsafeEvalCheck()}async init(t={}){let r=t.skipExtensionImports===!0?!0:t.manageImports===!1;await Je(r),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(let s in this._systemsHash){let o=this._systemsHash[s].constructor.defaultOptions;t=h(h({},o),t)}t=h(h({},Qe.defaultOptions),t),this._roundPixels=t.roundPixels?1:0;for(let s=0;s<this.runners.init.items.length;s++)await this.runners.init.items[s].init(t);this._initOptions=t}render(t,r){let s=t;if(s instanceof v&&(s={container:s},r&&(se(re,"passing a second argument is deprecated, please use render options instead"),s.target=r.renderTexture)),s.target||(s.target=this.view.renderTarget),s.target===this.view.renderTarget&&(this._lastObjectRendered=s.container,s.clearColor=this.background.colorRgba),s.clearColor){let i=Array.isArray(s.clearColor)&&s.clearColor.length===4;s.clearColor=i?s.clearColor:_.shared.setValue(s.clearColor).toArray()}s.transform||(s.container.updateLocalTransform(),s.transform=s.container.localTransform),this.runners.prerender.emit(s),this.runners.renderStart.emit(s),this.runners.render.emit(s),this.runners.renderEnd.emit(s),this.runners.postrender.emit(s)}resize(t,r,s){let i=this.view.resolution;this.view.resize(t,r,s),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),s!==void 0&&s!==i&&this.runners.resolutionChange.emit(s)}clear(t={}){let r=this;t.target||(t.target=r.renderTarget.renderTarget),t.clearColor||(t.clearColor=this.background.colorRgba),t.clear??(t.clear=y.ALL);let{clear:s,clearColor:i,target:o}=t;_.shared.setValue(i??this.background.colorRgba),r.renderTarget.clear(o,s,_.shared.toArray())}get resolution(){return this.view.resolution}set resolution(t){this.view.resolution=t,this.runners.resolutionChange.emit(t)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...t){t.forEach(r=>{this.runners[r]=new P(r)})}_addSystems(t){let r;for(r in t){let s=t[r];this._addSystem(s.value,s.name)}}_addSystem(t,r){let s=new t(this);if(this[r])throw new Error(`Whoops! The name "${r}" is already in use`);this[r]=s,this._systemsHash[r]=s;for(let i in this.runners)this.runners[i].add(s);return this}_addPipes(t,r){let s=r.reduce((i,o)=>(i[o.name]=o.value,i),{});t.forEach(i=>{let o=i.value,u=i.name,l=s[u];this.renderPipes[u]=new o(this,l?new l:null)})}destroy(t=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(t),Object.values(this.runners).forEach(r=>{r.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(t){return this.textureGenerator.generateTexture(t)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!he())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}};return n.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1},n})(),or=Bt;var F=class{constructor(e){this._renderer=e}updateRenderable(){}destroyRenderable(){}validateRenderable(){return!1}addRenderable(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}execute(e){e.isRenderable&&e.render(this._renderer)}destroy(){this._renderer=null}};F.extension={type:[a.WebGLPipes,a.WebGPUPipes,a.CanvasPipes],name:"customRender"};function fe(n,e){let t=n.instructionSet,r=t.instructions;for(let s=0;s<t.instructionSize;s++){let i=r[s];e[i.renderPipeId].execute(i)}}var H=class{constructor(e){this._renderer=e}addRenderGroup(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}execute(e){e.isRenderable&&(this._renderer.globalUniforms.push({worldTransformMatrix:e.worldTransform,worldColor:e.worldColorAlpha}),fe(e,this._renderer.renderPipes),this._renderer.globalUniforms.pop())}destroy(){this._renderer=null}};H.extension={type:[a.WebGLPipes,a.WebGPUPipes,a.CanvasPipes],name:"renderGroup"};function Ze(n,e){let t=n.root,r=n.instructionSet;r.reset();let s=e.renderPipes?e:e.batch.renderer,i=s.renderPipes;i.batch.buildStart(r),i.blendMode.buildStart(),i.colorMask.buildStart(),t.sortableChildren&&t.sortChildren(),et(t,r,s,!0),i.batch.buildEnd(r),i.blendMode.buildEnd(r)}function R(n,e,t){let r=t.renderPipes?t:t.batch.renderer;n.globalDisplayStatus<7||!n.includeInBuild||(n.sortableChildren&&n.sortChildren(),n.isSimple?Et(n,e,r):et(n,e,r,!1))}function Et(n,e,t){if(n.renderPipeId){let r=n,{renderPipes:s,renderableGC:i}=t;s.blendMode.setBlendMode(r,n.groupBlendMode,e),s[r.renderPipeId].addRenderable(r,e),i.addRenderable(r,e),r.didViewUpdate=!1}if(!n.renderGroup){let r=n.children,s=r.length;for(let i=0;i<s;i++)R(r[i],e,t)}}function et(n,e,t,r){let{renderPipes:s,renderableGC:i}=t;if(!r&&n.renderGroup)s.renderGroup.addRenderGroup(n.renderGroup,e);else{for(let d=0;d<n.effects.length;d++){let c=n.effects[d];s[c.pipe].push(c,n,e)}let o=n,u=o.renderPipeId;u&&(s.blendMode.setBlendMode(o,o.groupBlendMode,e),s[u].addRenderable(o,e),i.addRenderable(o,e),o.didViewUpdate=!1);let l=n.children;if(l.length)for(let d=0;d<l.length;d++)R(l[d],e,t);for(let d=n.effects.length-1;d>=0;d--){let c=n.effects[d];s[c.pipe].pop(c,n,e)}}}function L(n,e){e||(e=0);for(let t=e;t<n.length&&n[t];t++)n[t]=null}function Se(n,e=[]){e.push(n);for(let t=0;t<n.renderGroupChildren.length;t++)Se(n.renderGroupChildren[t],e);return e}function tt(n,e,t){let r=n>>16&255,s=n>>8&255,i=n&255,o=e>>16&255,u=e>>8&255,l=e&255,d=r+(o-r)*t,c=s+(u-s)*t,f=i+(l-i)*t;return(d<<16)+(c<<8)+f}var Me=16777215;function Pe(n,e){return n===Me||e===Me?n+e-Me:tt(n,e,.5)}var It=new v,rt=_e|ge|ve;function Re(n,e=!1){Ut(n);let t=n.childrenToUpdate,r=n.updateTick++;for(let s in t){let i=Number(s),o=t[s],u=o.list,l=o.index;for(let d=0;d<l;d++){let c=u[d];c.parentRenderGroup===n&&c.relativeRenderGroupDepth===i&&nt(c,r,0)}L(u,l),o.index=0}if(e)for(let s=0;s<n.renderGroupChildren.length;s++)Re(n.renderGroupChildren[s],e)}function Ut(n){let e=n.root,t;if(n.renderGroupParent){let r=n.renderGroupParent;n.worldTransform.appendFrom(e.relativeGroupTransform,r.worldTransform),n.worldColor=Pe(e.groupColor,r.worldColor),t=e.groupAlpha*r.worldAlpha}else n.worldTransform.copyFrom(e.localTransform),n.worldColor=e.localColor,t=e.localAlpha;t=t<0?0:t>1?1:t,n.worldAlpha=t,n.worldColorAlpha=n.worldColor+((t*255|0)<<24)}function nt(n,e,t){if(e===n.updateTick)return;n.updateTick=e,n.didChange=!1;let r=n.localTransform;n.updateLocalTransform();let s=n.parent;if(s&&!s.renderGroup?(t=t|n._updateFlags,n.relativeGroupTransform.appendFrom(r,s.relativeGroupTransform),t&rt&&st(n,s,t)):(t=n._updateFlags,n.relativeGroupTransform.copyFrom(r),t&rt&&st(n,It,t)),!n.renderGroup){let i=n.children,o=i.length;for(let d=0;d<o;d++)nt(i[d],e,t);let u=n.parentRenderGroup,l=n;l.renderPipeId&&!u.structureDidChange&&u.updateRenderable(l)}}function st(n,e,t){if(t&ge){n.groupColor=Pe(n.localColor,e.groupColor);let r=n.localAlpha*e.groupAlpha;r=r<0?0:r>1?1:r,n.groupAlpha=r,n.groupColorAlpha=n.groupColor+((r*255|0)<<24)}t&ve&&(n.groupBlendMode=n.localBlendMode==="inherit"?e.groupBlendMode:n.localBlendMode),t&_e&&(n.globalDisplayStatus=n.localDisplayStatus&e.globalDisplayStatus),n._updateFlags=0}function it(n,e){let{list:t,index:r}=n.childrenRenderablesToUpdate,s=!1;for(let i=0;i<r;i++){let o=t[i];if(s=e[o.renderPipeId].validateRenderable(o),s)break}return n.structureDidChange=s,s}var At=new g,z=class{constructor(e){this._renderer=e}render({container:e,transform:t}){e.isRenderGroup=!0;let r=e.parent,s=e.renderGroup.renderGroupParent;e.parent=null,e.renderGroup.renderGroupParent=null;let i=this._renderer,o=Se(e.renderGroup,[]),u=At;t&&(u=u.copyFrom(e.renderGroup.localTransform),e.renderGroup.localTransform.copyFrom(t));let l=i.renderPipes;for(let d=0;d<o.length;d++){let c=o[d];c.runOnRender(),c.instructionSet.renderPipes=l,c.structureDidChange?L(c.childrenRenderablesToUpdate.list,0):it(c,l),Re(c),c.structureDidChange?(c.structureDidChange=!1,Ze(c,i)):Ot(c),c.childrenRenderablesToUpdate.index=0,i.renderPipes.batch.upload(c.instructionSet)}i.globalUniforms.start({worldTransformMatrix:t?e.renderGroup.localTransform:e.renderGroup.worldTransform,worldColor:e.renderGroup.worldColorAlpha}),fe(e.renderGroup,l),l.uniformBatch&&l.uniformBatch.renderEnd(),t&&e.renderGroup.localTransform.copyFrom(u),e.parent=r,e.renderGroup.renderGroupParent=s}destroy(){this._renderer=null}};z.extension={type:[a.WebGLSystem,a.WebGPUSystem,a.CanvasSystem],name:"renderGroup"};function Ot(n){let{list:e,index:t}=n.childrenRenderablesToUpdate;for(let r=0;r<t;r++){let s=e[r];s.didViewUpdate&&n.updateRenderable(s)}L(e,t)}var W=class{constructor(e){this._gpuSpriteHash=Object.create(null),this._destroyRenderableBound=this.destroyRenderable.bind(this),this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_gpuSpriteHash")}addRenderable(e,t){let r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){let t=this._gpuSpriteHash[e.uid];e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){let t=e._texture,r=this._getGpuSprite(e);return r.texture._source!==t._source?!r._batcher.checkAndUpdateTexture(r,t):!1}destroyRenderable(e){let t=this._gpuSpriteHash[e.uid];k.return(t),this._gpuSpriteHash[e.uid]=null,e.off("destroyed",this._destroyRenderableBound)}_updateBatchableSprite(e,t){t.bounds=e.bounds,t.texture=e._texture}_getGpuSprite(e){return this._gpuSpriteHash[e.uid]||this._initGPUSprite(e)}_initGPUSprite(e){let t=k.get(Xe);return t.renderable=e,t.transform=e.groupTransform,t.texture=e._texture,t.bounds=e.bounds,t.roundPixels=this._renderer._roundPixels|e._roundPixels,this._gpuSpriteHash[e.uid]=t,e.on("destroyed",this._destroyRenderableBound),t}destroy(){for(let e in this._gpuSpriteHash)k.return(this._gpuSpriteHash[e]);this._gpuSpriteHash=null,this._renderer=null}};W.extension={type:[a.WebGLPipes,a.WebGPUPipes,a.CanvasPipes],name:"sprite"};var G="8.5.1";var Ge=class{static init(){globalThis.__PIXI_APP_INIT__?.(this,G)}static destroy(){}};Ge.extension=a.Application;var V=class{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,G)}destroy(){this._renderer=null}};V.extension={type:[a.WebGLSystem,a.WebGPUSystem],name:"initHook",priority:-10};var Be=class ot{constructor(e,t){this.state=ce.for2d(),this._batchersByInstructionSet=Object.create(null),this._activeBatches=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init?.(this)}static getBatcher(e){return new this._availableBatchers[e]}buildStart(e){let t=this._batchersByInstructionSet[e.uid];t||(t=this._batchersByInstructionSet[e.uid]=Object.create(null),t.default||(t.default=new ke)),this._activeBatches=t,this._activeBatch=this._activeBatches.default;for(let r in this._activeBatches)this._activeBatches[r].begin()}addToBatch(e,t){if(this._activeBatch.name!==e.batcherName){this._activeBatch.break(t);let r=this._activeBatches[e.batcherName];r||(r=this._activeBatches[e.batcherName]=ot.getBatcher(e.batcherName),r.begin()),this._activeBatch=r}this._activeBatch.add(e)}break(e){this._activeBatch.break(e)}buildEnd(e){this._activeBatch.break(e);let t=this._activeBatches;for(let r in t){let s=t[r],i=s.geometry;i.indexBuffer.setDataWithSize(s.indexBuffer,s.indexSize,!0),i.buffers[0].setDataWithSize(s.attributeBuffer.float32View,s.attributeSize,!1)}}upload(e){let t=this._batchersByInstructionSet[e.uid];for(let r in t){let s=t[r],i=s.geometry;s.dirty&&(s.dirty=!1,i.buffers[0].update(s.attributeSize*4))}}execute(e){if(e.action==="startBatch"){let t=e.batcher,r=t.geometry,s=t.shader;this._adaptor.start(this,r,s)}this._adaptor.execute(this,e)}destroy(){this.state=null,this.renderer=null,this._adaptor=null;for(let e in this._activeBatches)this._activeBatches[e].destroy();this._activeBatches=null}};Be.extension={type:[a.WebGLPipes,a.WebGPUPipes,a.CanvasPipes],name:"batch"};Be._availableBatchers=Object.create(null);var Ee=Be;T.handleByMap(a.Batcher,Ee._availableBatchers);T.add(ke);var Dt=(()=>{let n=class Ie extends Ke{constructor(t){t=h(h({},Ie.defaultOptions),t),super(t),this.enabled=!0,this._state=ce.for2d(),this.blendMode=t.blendMode,this.padding=t.padding,typeof t.antialias=="boolean"?this.antialias=t.antialias?"on":"off":this.antialias=t.antialias,this.resolution=t.resolution,this.blendRequired=t.blendRequired,this.clipToViewport=t.clipToViewport,this.addResource("uTexture",0,1)}apply(t,r,s,i){t.applyFilter(this,r,s,i)}get blendMode(){return this._state.blendMode}set blendMode(t){this._state.blendMode=t}static from(t){let l=t,{gpu:r,gl:s}=l,i=te(l,["gpu","gl"]),o,u;return r&&(o=ue.from(r)),s&&(u=le.from(s)),new Ie(h({gpuProgram:o,glProgram:u},i))}};return n.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0},n})(),at=Dt;var lt=`in vec2 vMaskCoord;
in vec2 vTextureCoord;

uniform sampler2D uTexture;
uniform sampler2D uMaskTexture;

uniform float uAlpha;
uniform vec4 uMaskClamp;
uniform float uInverse;

out vec4 finalColor;

void main(void)
{
    float clip = step(3.5,
        step(uMaskClamp.x, vMaskCoord.x) +
        step(uMaskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, uMaskClamp.z) +
        step(vMaskCoord.y, uMaskClamp.w));

    // TODO look into why this is needed
    float npmAlpha = uAlpha;
    vec4 original = texture(uTexture, vTextureCoord);
    vec4 masky = texture(uMaskTexture, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    float a = alphaMul * masky.r * npmAlpha * clip;

    if (uInverse == 1.0) {
        a = 1.0 - a;
    }

    finalColor = original * a;
}
`;var ut=`in vec2 aPosition;

out vec2 vTextureCoord;
out vec2 vMaskCoord;


uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;
uniform mat3 uFilterMatrix;

vec4 filterVertexPosition(  vec2 aPosition )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
       
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(  vec2 aPosition )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

vec2 getFilterCoord( vec2 aPosition )
{
    return  ( uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}   

void main(void)
{
    gl_Position = filterVertexPosition(aPosition);
    vTextureCoord = filterTextureCoord(aPosition);
    vMaskCoord = getFilterCoord(aPosition);
}
`;var Ue=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct MaskUniforms {
  uFilterMatrix:mat3x3<f32>,
  uMaskClamp:vec4<f32>,
  uAlpha:f32,
  uInverse:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> filterUniforms : MaskUniforms;
@group(1) @binding(1) var uMaskTexture: texture_2d<f32>;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) filterUv : vec2<f32>,
};

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);
}

fn getFilterCoord(aPosition:vec2<f32> ) -> vec2<f32>
{
  return ( filterUniforms.uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
   getFilterCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) filterUv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var maskClamp = filterUniforms.uMaskClamp;
    var uAlpha = filterUniforms.uAlpha;

    var clip = step(3.5,
      step(maskClamp.x, filterUv.x) +
      step(maskClamp.y, filterUv.y) +
      step(filterUv.x, maskClamp.z) +
      step(filterUv.y, maskClamp.w));

    var mask = textureSample(uMaskTexture, uSampler, filterUv);
    var source = textureSample(uTexture, uSampler, uv);
    var alphaMul = 1.0 - uAlpha * (1.0 - mask.a);

    var a: f32 = alphaMul * mask.r * uAlpha * clip;

    if (filterUniforms.uInverse == 1.0) {
        a = 1.0 - a;
    }

    return source * a;
}
`;var pe=class extends at{constructor(e){let l=e,{sprite:t}=l,r=te(l,["sprite"]),s=new je(t.texture),i=new de({uFilterMatrix:{value:new g,type:"mat3x3<f32>"},uMaskClamp:{value:s.uClampFrame,type:"vec4<f32>"},uAlpha:{value:1,type:"f32"},uInverse:{value:e.inverse?1:0,type:"f32"}}),o=ue.from({vertex:{source:Ue,entryPoint:"mainVertex"},fragment:{source:Ue,entryPoint:"mainFragment"}}),u=le.from({vertex:ut,fragment:lt,name:"mask-filter"});super(w(h({},r),{gpuProgram:o,glProgram:u,resources:{filterUniforms:i,uMaskTexture:t.texture.source}})),this.sprite=t,this._textureMatrix=s}set inverse(e){this.resources.filterUniforms.uniforms.uInverse=e?1:0}get inverse(){return this.resources.filterUniforms.uniforms.uInverse===1}apply(e,t,r,s){this._textureMatrix.texture=this.sprite.texture,e.calculateSpriteMatrix(this.resources.filterUniforms.uniforms.uFilterMatrix,this.sprite).prepend(this._textureMatrix.mapCoord),this.resources.uMaskTexture=this.sprite.texture.source,e.applyFilter(this,t,r,s)}};var Ft=new ie,Ae=class extends ne{constructor(){super(),this.filters=[new pe({sprite:new qe(p.EMPTY),inverse:!1,resolution:"inherit",antialias:"inherit"})]}get sprite(){return this.filters[0].sprite}set sprite(e){this.filters[0].sprite=e}get inverse(){return this.filters[0].inverse}set inverse(e){this.filters[0].inverse=e}},N=class{constructor(e){this._activeMaskStage=[],this._renderer=e}push(e,t,r){let s=this._renderer;if(s.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"pushMaskBegin",mask:e,inverse:t._maskOptions.inverse,canBundle:!1,maskedContainer:t}),e.inverse=t._maskOptions.inverse,e.renderMaskToTexture){let i=e.mask;i.includeInBuild=!0,R(i,r,s),i.includeInBuild=!1}s.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"pushMaskEnd",mask:e,maskedContainer:t,inverse:t._maskOptions.inverse,canBundle:!1})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"popMaskEnd",mask:e,inverse:t._maskOptions.inverse,canBundle:!1})}execute(e){let t=this._renderer,r=e.mask.renderMaskToTexture;if(e.action==="pushMaskBegin"){let s=k.get(Ae);if(s.inverse=e.inverse,r){e.mask.mask.measurable=!0;let i=Ve(e.mask.mask,!0,Ft);e.mask.mask.measurable=!1,i.ceil();let o=t.renderTarget.renderTarget.colorTexture.source,u=Ce.getOptimalTexture(i.width,i.height,o._resolution,o.antialias);t.renderTarget.push(u,!0),t.globalUniforms.push({offset:i,worldColor:4294967295});let l=s.sprite;l.texture=u,l.worldTransform.tx=i.minX,l.worldTransform.ty=i.minY,this._activeMaskStage.push({filterEffect:s,maskedContainer:e.maskedContainer,filterTexture:u})}else s.sprite=e.mask.mask,this._activeMaskStage.push({filterEffect:s,maskedContainer:e.maskedContainer})}else if(e.action==="pushMaskEnd"){let s=this._activeMaskStage[this._activeMaskStage.length-1];r&&(t.type===M.WEBGL&&t.renderTarget.finishRenderPass(),t.renderTarget.pop(),t.globalUniforms.pop()),t.filter.push({renderPipeId:"filter",action:"pushFilter",container:s.maskedContainer,filterEffect:s.filterEffect,canBundle:!1})}else if(e.action==="popMaskEnd"){t.filter.pop();let s=this._activeMaskStage.pop();r&&Ce.returnTexture(s.filterTexture),k.return(s.filterEffect)}}destroy(){this._renderer=null,this._activeMaskStage=null}};N.extension={type:[a.WebGLPipes,a.WebGPUPipes,a.CanvasPipes],name:"alphaMask"};var j=class{constructor(e){this._colorStack=[],this._colorStackIndex=0,this._currentColor=0,this._renderer=e}buildStart(){this._colorStack[0]=15,this._colorStackIndex=1,this._currentColor=15}push(e,t,r){this._renderer.renderPipes.batch.break(r);let i=this._colorStack;i[this._colorStackIndex]=i[this._colorStackIndex-1]&e.mask;let o=this._colorStack[this._colorStackIndex];o!==this._currentColor&&(this._currentColor=o,r.add({renderPipeId:"colorMask",colorMask:o,canBundle:!1})),this._colorStackIndex++}pop(e,t,r){this._renderer.renderPipes.batch.break(r);let i=this._colorStack;this._colorStackIndex--;let o=i[this._colorStackIndex-1];o!==this._currentColor&&(this._currentColor=o,r.add({renderPipeId:"colorMask",colorMask:o,canBundle:!1}))}execute(e){this._renderer.colorMask.setMask(e.colorMask)}destroy(){this._colorStack=null}};j.extension={type:[a.WebGLPipes,a.WebGPUPipes,a.CanvasPipes],name:"colorMask"};var q=class{constructor(e){this._maskStackHash={},this._maskHash=new WeakMap,this._renderer=e}push(e,t,r){var s;let i=e,o=this._renderer;o.renderPipes.batch.break(r),o.renderPipes.blendMode.setBlendMode(i.mask,"none",r),r.add({renderPipeId:"stencilMask",action:"pushMaskBegin",mask:e,inverse:t._maskOptions.inverse,canBundle:!1});let u=i.mask;u.includeInBuild=!0,this._maskHash.has(i)||this._maskHash.set(i,{instructionsStart:0,instructionsLength:0});let l=this._maskHash.get(i);l.instructionsStart=r.instructionSize,R(u,r,o),u.includeInBuild=!1,o.renderPipes.batch.break(r),r.add({renderPipeId:"stencilMask",action:"pushMaskEnd",mask:e,inverse:t._maskOptions.inverse,canBundle:!1});let d=r.instructionSize-l.instructionsStart-1;l.instructionsLength=d;let c=o.renderTarget.renderTarget.uid;(s=this._maskStackHash)[c]??(s[c]=0)}pop(e,t,r){let s=e,i=this._renderer;i.renderPipes.batch.break(r),i.renderPipes.blendMode.setBlendMode(s.mask,"none",r),r.add({renderPipeId:"stencilMask",action:"popMaskBegin",inverse:t._maskOptions.inverse,canBundle:!1});let o=this._maskHash.get(e);for(let u=0;u<o.instructionsLength;u++)r.instructions[r.instructionSize++]=r.instructions[o.instructionsStart++];r.add({renderPipeId:"stencilMask",action:"popMaskEnd",canBundle:!1})}execute(e){var t;let r=this._renderer,s=r.renderTarget.renderTarget.uid,i=(t=this._maskStackHash)[s]??(t[s]=0);e.action==="pushMaskBegin"?(r.renderTarget.ensureDepthStencil(),r.stencil.setStencilMode(m.RENDERING_MASK_ADD,i),i++,r.colorMask.setMask(0)):e.action==="pushMaskEnd"?(e.inverse?r.stencil.setStencilMode(m.INVERSE_MASK_ACTIVE,i):r.stencil.setStencilMode(m.MASK_ACTIVE,i),r.colorMask.setMask(15)):e.action==="popMaskBegin"?(r.colorMask.setMask(0),i!==0?r.stencil.setStencilMode(m.RENDERING_MASK_REMOVE,i):(r.renderTarget.clear(null,y.STENCIL),r.stencil.setStencilMode(m.DISABLED,i)),i--):e.action==="popMaskEnd"&&(e.inverse?r.stencil.setStencilMode(m.INVERSE_MASK_ACTIVE,i):r.stencil.setStencilMode(m.MASK_ACTIVE,i),r.colorMask.setMask(15)),this._maskStackHash[s]=i}destroy(){this._renderer=null,this._maskStackHash=null,this._maskHash=null}};q.extension={type:[a.WebGLPipes,a.WebGPUPipes,a.CanvasPipes],name:"stencilMask"};var Oe=class dt{constructor(){this.clearBeforeRender=!0,this._backgroundColor=new _(0),this.color=this._backgroundColor,this.alpha=1}init(e){e=h(h({},dt.defaultOptions),e),this.clearBeforeRender=e.clearBeforeRender,this.color=e.background||e.backgroundColor||this._backgroundColor,this.alpha=e.backgroundAlpha,this._backgroundColor.setAlpha(e.backgroundAlpha)}get color(){return this._backgroundColor}set color(e){this._backgroundColor.setValue(e)}get alpha(){return this._backgroundColor.alpha}set alpha(e){this._backgroundColor.setAlpha(e)}get colorRgba(){return this._backgroundColor.toArray()}destroy(){}};Oe.extension={type:[a.WebGLSystem,a.WebGPUSystem,a.CanvasSystem],name:"background",priority:0};Oe.defaultOptions={backgroundAlpha:1,backgroundColor:0,clearBeforeRender:!0};var ct=Oe;var $={};T.handle(a.BlendMode,n=>{if(!n.name)throw new Error("BlendMode extension must have a name property");$[n.name]=n.ref},n=>{delete $[n.name]});var K=class{constructor(e){this._isAdvanced=!1,this._filterHash=Object.create(null),this._renderer=e}setBlendMode(e,t,r){if(this._activeBlendMode===t){this._isAdvanced&&this._renderableList.push(e);return}this._activeBlendMode=t,this._isAdvanced&&this._endAdvancedBlendMode(r),this._isAdvanced=!!$[t],this._isAdvanced&&(this._beginAdvancedBlendMode(r),this._renderableList.push(e))}_beginAdvancedBlendMode(e){this._renderer.renderPipes.batch.break(e);let t=this._activeBlendMode;if(!$[t]){oe(`Unable to assign BlendMode: '${t}'. You may want to include: import 'pixi.js/advanced-blend-modes'`);return}let r=this._filterHash[t];r||(r=this._filterHash[t]=new ne,r.filters=[new $[t]]);let s={renderPipeId:"filter",action:"pushFilter",renderables:[],filterEffect:r,canBundle:!1};this._renderableList=s.renderables,e.add(s)}_endAdvancedBlendMode(e){this._renderableList=null,this._renderer.renderPipes.batch.break(e),e.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}buildStart(){this._isAdvanced=!1}buildEnd(e){this._isAdvanced&&this._endAdvancedBlendMode(e)}destroy(){this._renderer=null,this._renderableList=null;for(let e in this._filterHash)this._filterHash[e].destroy();this._filterHash=null}};K.extension={type:[a.WebGLPipes,a.WebGPUPipes,a.CanvasPipes],name:"blendMode"};var De={png:"image/png",jpg:"image/jpeg",webp:"image/webp"},Fe=class ht{constructor(e){this._renderer=e}_normalizeOptions(e,t={}){return e instanceof v||e instanceof p?h({target:e},t):h(h({},t),e)}async image(e){let t=new Image;return t.src=await this.base64(e),t}async base64(e){e=this._normalizeOptions(e,ht.defaultImageOptions);let{format:t,quality:r}=e,s=this.canvas(e);if(s.toBlob!==void 0)return new Promise((i,o)=>{s.toBlob(u=>{if(!u){o(new Error("ICanvas.toBlob failed!"));return}let l=new FileReader;l.onload=()=>i(l.result),l.onerror=o,l.readAsDataURL(u)},De[t],r)});if(s.toDataURL!==void 0)return s.toDataURL(De[t],r);if(s.convertToBlob!==void 0){let i=await s.convertToBlob({type:De[t],quality:r});return new Promise((o,u)=>{let l=new FileReader;l.onload=()=>o(l.result),l.onerror=u,l.readAsDataURL(i)})}throw new Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented")}canvas(e){e=this._normalizeOptions(e);let t=e.target,r=this._renderer;if(t instanceof p)return r.texture.generateCanvas(t);let s=r.textureGenerator.generateTexture(e),i=r.texture.generateCanvas(s);return s.destroy(),i}pixels(e){e=this._normalizeOptions(e);let t=e.target,r=this._renderer,s=t instanceof p?t:r.textureGenerator.generateTexture(e),i=r.texture.getPixels(s);return t instanceof v&&s.destroy(),i}texture(e){return e=this._normalizeOptions(e),e.target instanceof p?e.target:this._renderer.textureGenerator.generateTexture(e)}download(e){e=this._normalizeOptions(e);let t=this.canvas(e),r=document.createElement("a");r.download=e.filename??"image.png",r.href=t.toDataURL("image/png"),document.body.appendChild(r),r.click(),document.body.removeChild(r)}log(e){let t=e.width??200;e=this._normalizeOptions(e);let r=this.canvas(e),s=r.toDataURL();console.log(`[Pixi Texture] ${r.width}px ${r.height}px`);let i=["font-size: 1px;",`padding: ${t}px 300px;`,`background: url(${s}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",i)}destroy(){this._renderer=null}};Fe.extension={type:[a.WebGLSystem,a.WebGPUSystem],name:"extract"};Fe.defaultImageOptions={format:"png",quality:1};var ft=Fe;var me=class n extends p{static create(e){return new n({source:new b(e)})}resize(e,t,r){return this.source.resize(e,t,r),this}};var Ht=new C,Lt=new ie,zt=[0,0,0,0],Y=class{constructor(e){this._renderer=e}generateTexture(e){e instanceof v&&(e={target:e,frame:void 0,textureSourceOptions:{},resolution:void 0});let t=e.resolution||this._renderer.resolution,r=e.antialias||this._renderer.view.antialias,s=e.target,i=e.clearColor;i?i=Array.isArray(i)&&i.length===4?i:_.shared.setValue(i).toArray():i=zt;let o=e.frame?.copyTo(Ht)||Ne(s,Lt).rectangle;o.width=Math.max(o.width,1/t)|0,o.height=Math.max(o.height,1/t)|0;let u=me.create(w(h({},e.textureSourceOptions),{width:o.width,height:o.height,resolution:t,antialias:r})),l=g.shared.translate(-o.x,-o.y);return this._renderer.render({container:s,transform:l,target:u,clearColor:i}),u.source.updateMipmaps(),u}destroy(){this._renderer=null}};Y.extension={type:[a.WebGLSystem,a.WebGPUSystem],name:"textureGenerator"};var X=class{constructor(e){this._stackIndex=0,this._globalUniformDataStack=[],this._uniformsPool=[],this._activeUniforms=[],this._bindGroupPool=[],this._activeBindGroups=[],this._renderer=e}reset(){this._stackIndex=0;for(let e=0;e<this._activeUniforms.length;e++)this._uniformsPool.push(this._activeUniforms[e]);for(let e=0;e<this._activeBindGroups.length;e++)this._bindGroupPool.push(this._activeBindGroups[e]);this._activeUniforms.length=0,this._activeBindGroups.length=0}start(e){this.reset(),this.push(e)}bind({size:e,projectionMatrix:t,worldTransformMatrix:r,worldColor:s,offset:i}){let o=this._renderer.renderTarget.renderTarget,u=this._stackIndex?this._globalUniformDataStack[this._stackIndex-1]:{projectionData:o,worldTransformMatrix:new g,worldColor:4294967295,offset:new We},l={projectionMatrix:t||this._renderer.renderTarget.projectionMatrix,resolution:e||o.size,worldTransformMatrix:r||u.worldTransformMatrix,worldColor:s||u.worldColor,offset:i||u.offset,bindGroup:null},d=this._uniformsPool.pop()||this._createUniforms();this._activeUniforms.push(d);let c=d.uniforms;c.uProjectionMatrix=l.projectionMatrix,c.uResolution=l.resolution,c.uWorldTransformMatrix.copyFrom(l.worldTransformMatrix),c.uWorldTransformMatrix.tx-=l.offset.x,c.uWorldTransformMatrix.ty-=l.offset.y,Ye(l.worldColor,c.uWorldColorAlpha,0),d.update();let f;this._renderer.renderPipes.uniformBatch?f=this._renderer.renderPipes.uniformBatch.getUniformBindGroup(d,!1):(f=this._bindGroupPool.pop()||new $e,this._activeBindGroups.push(f),f.setResource(d,0)),l.bindGroup=f,this._currentGlobalUniformData=l}push(e){this.bind(e),this._globalUniformDataStack[this._stackIndex++]=this._currentGlobalUniformData}pop(){this._currentGlobalUniformData=this._globalUniformDataStack[--this._stackIndex-1],this._renderer.type===M.WEBGL&&this._currentGlobalUniformData.bindGroup.resources[0].update()}get bindGroup(){return this._currentGlobalUniformData.bindGroup}get globalUniformData(){return this._currentGlobalUniformData}get uniformGroup(){return this._currentGlobalUniformData.bindGroup.resources[0]}_createUniforms(){return new de({uProjectionMatrix:{value:new g,type:"mat3x3<f32>"},uWorldTransformMatrix:{value:new g,type:"mat3x3<f32>"},uWorldColorAlpha:{value:new Float32Array(4),type:"vec4<f32>"},uResolution:{value:[0,0],type:"vec2<f32>"}},{isStatic:!0})}destroy(){this._renderer=null}};X.extension={type:[a.WebGLSystem,a.WebGPUSystem,a.CanvasSystem],name:"globalUniforms"};var Wt=1,J=class{constructor(){this._tasks=[],this._offset=0}init(){be.system.add(this._update,this)}repeat(e,t,r=!0){let s=Wt++,i=0;return r&&(this._offset+=1e3,i=this._offset),this._tasks.push({func:e,duration:t,start:performance.now(),offset:i,last:performance.now(),repeat:!0,id:s}),s}cancel(e){for(let t=0;t<this._tasks.length;t++)if(this._tasks[t].id===e){this._tasks.splice(t,1);return}}_update(){let e=performance.now();for(let t=0;t<this._tasks.length;t++){let r=this._tasks[t];if(e-r.offset-r.last>=r.duration){let s=e-r.start;r.func(s),r.last=e}}}destroy(){be.system.remove(this._update,this),this._tasks.length=0}};J.extension={type:[a.WebGLSystem,a.WebGPUSystem,a.CanvasSystem],name:"scheduler",priority:0};var pt=!1;function mt(n){if(!pt){if(ae.get().getNavigator().userAgent.toLowerCase().indexOf("chrome")>-1){let e=[`%c  %c  %c  %c  %c PixiJS %c v${G} (${n}) http://www.pixijs.com/

`,"background: #E72264; padding:5px 0;","background: #6CA2EA; padding:5px 0;","background: #B5D33D; padding:5px 0;","background: #FED23F; padding:5px 0;","color: #FFFFFF; background: #E72264; padding:5px 0;","color: #E72264; background: #FFFFFF; padding:5px 0;"];globalThis.console.log(...e)}else globalThis.console&&globalThis.console.log(`PixiJS ${G} - ${n} - http://www.pixijs.com/`);pt=!0}}var B=class{constructor(e){this._renderer=e}init(e){if(e.hello){let t=this._renderer.name;this._renderer.type===M.WEBGL&&(t+=` ${this._renderer.context.webGLVersion}`),mt(t)}}};B.extension={type:[a.WebGLSystem,a.WebGPUSystem,a.CanvasSystem],name:"hello",priority:-2};B.defaultOptions={hello:!1};function xt(n){let e=!1;for(let r in n)if(n[r]==null){e=!0;break}if(!e)return n;let t=Object.create(null);for(let r in n){let s=n[r];s&&(t[r]=s)}return t}function gt(n){let e=0;for(let t=0;t<n.length;t++)n[t]==null?e++:n[t-e]=n[t];return n.length=n.length-e,n}var He=class vt{constructor(e){this._managedRenderables=[],this._managedHashes=[],this._managedArrays=[],this._renderer=e}init(e){e=h(h({},vt.defaultOptions),e),this.maxUnusedTime=e.renderableGCMaxUnusedTime,this._frequency=e.renderableGCFrequency,this.enabled=e.renderableGCActive}get enabled(){return!!this._handler}set enabled(e){this.enabled!==e&&(e?(this._handler=this._renderer.scheduler.repeat(()=>this.run(),this._frequency,!1),this._hashHandler=this._renderer.scheduler.repeat(()=>{for(let t of this._managedHashes)t.context[t.hash]=xt(t.context[t.hash])},this._frequency),this._arrayHandler=this._renderer.scheduler.repeat(()=>{for(let t of this._managedArrays)gt(t.context[t.hash])},this._frequency)):(this._renderer.scheduler.cancel(this._handler),this._renderer.scheduler.cancel(this._hashHandler),this._renderer.scheduler.cancel(this._arrayHandler)))}addManagedHash(e,t){this._managedHashes.push({context:e,hash:t})}addManagedArray(e,t){this._managedArrays.push({context:e,hash:t})}prerender(){this._now=performance.now()}addRenderable(e,t){this.enabled&&(e._lastUsed=this._now,e._lastInstructionTick===-1&&(this._managedRenderables.push(e),e.once("destroyed",this._removeRenderable,this)),e._lastInstructionTick=t.tick)}run(){let e=performance.now(),t=this._managedRenderables,r=this._renderer.renderPipes,s=0;for(let i=0;i<t.length;i++){let o=t[i];if(o===null){s++;continue}let l=(o.renderGroup??o.parentRenderGroup)?.instructionSet?.tick??-1;o._lastInstructionTick!==l&&e-o._lastUsed>this.maxUnusedTime?(o.destroyed||r[o.renderPipeId].destroyRenderable(o),o._lastInstructionTick=-1,s++,o.off("destroyed",this._removeRenderable,this)):t[i-s]=o}t.length=t.length-s}destroy(){this.enabled=!1,this._renderer=null,this._managedRenderables.length=0,this._managedHashes.length=0,this._managedArrays.length=0}_removeRenderable(e){let t=this._managedRenderables.indexOf(e);t>=0&&(e.off("destroyed",this._removeRenderable,this),this._managedRenderables[t]=null)}};He.extension={type:[a.WebGLSystem,a.WebGPUSystem],name:"renderableGC",priority:0};He.defaultOptions={renderableGCActive:!0,renderableGCMaxUnusedTime:6e4,renderableGCFrequency:3e4};var _t=He;var Le=class bt{constructor(e){this._renderer=e,this.count=0,this.checkCount=0}init(e){e=h(h({},bt.defaultOptions),e),this.checkCountMax=e.textureGCCheckCountMax,this.maxIdle=e.textureGCAMaxIdle??e.textureGCMaxIdle,this.active=e.textureGCActive}postrender(){this._renderer.renderingToScreen&&(this.count++,this.active&&(this.checkCount++,this.checkCount>this.checkCountMax&&(this.checkCount=0,this.run())))}run(){let e=this._renderer.texture.managedTextures;for(let t=0;t<e.length;t++){let r=e[t];r.autoGarbageCollect&&r.resource&&r._touched>-1&&this.count-r._touched>this.maxIdle&&(r._touched=-1,r.unload())}}destroy(){this._renderer=null}};Le.extension={type:[a.WebGLSystem,a.WebGPUSystem],name:"textureGC"};Le.defaultOptions={textureGCActive:!0,textureGCAMaxIdle:null,textureGCMaxIdle:60*60,textureGCCheckCountMax:600};var yt=Le;var Vt=(()=>{let n=class Tt{constructor(t={}){if(this.uid=S("renderTarget"),this.colorTextures=[],this.dirtyId=0,this.isRoot=!1,this._size=new Float32Array(2),this._managedColorTextures=!1,t=h(h({},Tt.defaultOptions),t),this.stencil=t.stencil,this.depth=t.depth,this.isRoot=t.isRoot,typeof t.colorTextures=="number"){this._managedColorTextures=!0;for(let r=0;r<t.colorTextures;r++)this.colorTextures.push(new b({width:t.width,height:t.height,resolution:t.resolution,antialias:t.antialias}))}else{this.colorTextures=[...t.colorTextures.map(s=>s.source)];let r=this.colorTexture.source;this.resize(r.width,r.height,r._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),(t.depthStencilTexture||this.stencil)&&(t.depthStencilTexture instanceof p||t.depthStencilTexture instanceof b?this.depthStencilTexture=t.depthStencilTexture.source:this.ensureDepthStencilTexture())}get size(){let t=this._size;return t[0]=this.pixelWidth,t[1]=this.pixelHeight,t}get width(){return this.colorTexture.source.width}get height(){return this.colorTexture.source.height}get pixelWidth(){return this.colorTexture.source.pixelWidth}get pixelHeight(){return this.colorTexture.source.pixelHeight}get resolution(){return this.colorTexture.source._resolution}get colorTexture(){return this.colorTextures[0]}onSourceResize(t){this.resize(t.width,t.height,t._resolution,!0)}ensureDepthStencilTexture(){this.depthStencilTexture||(this.depthStencilTexture=new b({width:this.width,height:this.height,resolution:this.resolution,format:"depth24plus-stencil8",autoGenerateMipmaps:!1,antialias:!1,mipLevelCount:1}))}resize(t,r,s=this.resolution,i=!1){this.dirtyId++,this.colorTextures.forEach((o,u)=>{i&&u===0||o.source.resize(t,r,s)}),this.depthStencilTexture&&this.depthStencilTexture.source.resize(t,r,s)}destroy(){this.colorTexture.source.off("resize",this.onSourceResize,this),this._managedColorTextures&&this.colorTextures.forEach(t=>{t.destroy()}),this.depthStencilTexture&&(this.depthStencilTexture.destroy(),delete this.depthStencilTexture)}};return n.defaultOptions={width:0,height:0,resolution:1,colorTextures:1,stencil:!1,depth:!1,antialias:!1,isRoot:!1},n})(),Q=Vt;var Z=new Map;function xe(n,e){if(!Z.has(n)){let t=new p({source:new A(h({resource:n},e))}),r=()=>{Z.get(n)===t&&Z.delete(n)};t.once("destroy",r),t.source.once("destroy",r),Z.set(n,t)}return Z.get(n)}var ze=class kt{get autoDensity(){return this.texture.source.autoDensity}set autoDensity(e){this.texture.source.autoDensity=e}get resolution(){return this.texture.source._resolution}set resolution(e){this.texture.source.resize(this.texture.source.width,this.texture.source.height,e)}init(e){e=h(h({},kt.defaultOptions),e),e.view&&(se(re,"ViewSystem.view has been renamed to ViewSystem.canvas"),e.canvas=e.view),this.screen=new C(0,0,e.width,e.height),this.canvas=e.canvas||ae.get().createCanvas(),this.antialias=!!e.antialias,this.texture=xe(this.canvas,e),this.renderTarget=new Q({colorTextures:[this.texture],depth:!!e.depth,isRoot:!0}),this.texture.source.transparent=e.backgroundAlpha<1,this.resolution=e.resolution}resize(e,t,r){this.texture.source.resize(e,t,r),this.screen.width=this.texture.frame.width,this.screen.height=this.texture.frame.height}destroy(e=!1){(typeof e=="boolean"?e:!!e?.removeView)&&this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}};ze.extension={type:[a.WebGLSystem,a.WebGPUSystem,a.CanvasSystem],name:"view",priority:0};ze.defaultOptions={width:800,height:600,autoDensity:!1,antialias:!1};var Ct=ze;var pi=[ct,X,B,Ct,z,yt,Y,ft,V,_t,J],mi=[K,Ee,W,H,N,q,j,F];var gi={name:"texture-bit",vertex:{header:`

        struct TextureUniforms {
            uTextureMatrix:mat3x3<f32>,
        }

        @group(2) @binding(2) var<uniform> textureUniforms : TextureUniforms;
        `,main:`
            uv = (textureUniforms.uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
            @group(2) @binding(0) var uTexture: texture_2d<f32>;
            @group(2) @binding(1) var uSampler: sampler;

         
        `,main:`
            outColor = textureSample(uTexture, uSampler, vUV);
        `}},vi={name:"texture-bit",vertex:{header:`
            uniform mat3 uTextureMatrix;
        `,main:`
            uv = (uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
        uniform sampler2D uTexture;

         
        `,main:`
            outColor = texture(uTexture, vUV);
        `}};var wt=class{constructor(e){this._syncFunctionHash=Object.create(null),this._adaptor=e,this._systemCheck()}_systemCheck(){if(!he())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}ensureUniformGroup(e){let t=this.getUniformGroupData(e);e.buffer||(e.buffer=new ye({data:new Float32Array(t.layout.size/4),usage:O.UNIFORM|O.COPY_DST}))}getUniformGroupData(e){return this._syncFunctionHash[e._signature]||this._initUniformGroup(e)}_initUniformGroup(e){let t=e._signature,r=this._syncFunctionHash[t];if(!r){let s=Object.keys(e.uniformStructures).map(u=>e.uniformStructures[u]),i=this._adaptor.createUboElements(s),o=this._generateUboSync(i.uboElements);r=this._syncFunctionHash[t]={layout:i,syncFunction:o}}return this._syncFunctionHash[t]}_generateUboSync(e){return this._adaptor.generateUboSync(e)}syncUniformGroup(e,t,r){let s=this.getUniformGroupData(e);return e.buffer||(e.buffer=new ye({data:new Float32Array(s.layout.size/4),usage:O.UNIFORM|O.COPY_DST})),t||(t=e.buffer.data),r||(r=0),s.syncFunction(e.uniforms,t,r),!0}updateUniformGroup(e){if(e.isStatic&&!e._dirtyId)return!1;e._dirtyId=0;let t=this.syncUniformGroup(e);return e.buffer.update(),t}destroy(){this._syncFunctionHash=null}};var St=class extends U{constructor({buffer:e,offset:t,size:r}){super(),this.uid=S("buffer"),this._resourceType="bufferResource",this._touched=0,this._resourceId=S("resource"),this._bufferResource=!0,this.destroyed=!1,this.buffer=e,this.offset=t|0,this.size=r,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this._resourceId=S("resource"),this.emit("change",this)}destroy(e=!1){this.destroyed=!0,e&&this.buffer.destroy(),this.emit("change",this),this.buffer=null}};function Ri(n,e){for(let t in n.attributes){let r=n.attributes[t],s=e[t];s?(r.format??(r.format=s.format),r.offset??(r.offset=s.offset),r.instance??(r.instance=s.instance)):oe(`Attribute ${t} is not present in the shader, but is present in the geometry. Unable to infer attribute details.`)}Nt(n)}function Nt(n){let{buffers:e,attributes:t}=n,r={},s={};for(let i in e){let o=e[i];r[o.uid]=0,s[o.uid]=0}for(let i in t){let o=t[i];r[o.buffer.uid]+=Te(o.format).stride}for(let i in t){let o=t[i];o.stride??(o.stride=r[o.buffer.uid]),o.start??(o.start=s[o.buffer.uid]),s[o.buffer.uid]+=Te(o.format).stride}}var E=[];E[m.NONE]=void 0;E[m.DISABLED]={stencilWriteMask:0,stencilReadMask:0};E[m.RENDERING_MASK_ADD]={stencilFront:{compare:"equal",passOp:"increment-clamp"},stencilBack:{compare:"equal",passOp:"increment-clamp"}};E[m.RENDERING_MASK_REMOVE]={stencilFront:{compare:"equal",passOp:"decrement-clamp"},stencilBack:{compare:"equal",passOp:"decrement-clamp"}};E[m.MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"equal",passOp:"keep"},stencilBack:{compare:"equal",passOp:"keep"}};E[m.INVERSE_MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"not-equal",passOp:"replace"},stencilBack:{compare:"not-equal",passOp:"replace"}};function Mt(n,e,t,r,s,i){let o=i?1:-1;return n.identity(),n.a=1/r*2,n.d=o*(1/s*2),n.tx=-1-e*n.a,n.ty=-o-t*n.d,n}function Pt(n){let e=n.colorTexture.source.resource;return globalThis.HTMLCanvasElement&&e instanceof HTMLCanvasElement&&document.body.contains(e)}var Rt=class{constructor(e){this.rootViewPort=new C,this.viewport=new C,this.onRenderTargetChange=new P("onRenderTargetChange"),this.projectionMatrix=new g,this.defaultClearColor=[0,0,0,0],this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._renderer=e,e.renderableGC.addManagedHash(this,"_gpuRenderTargetHash")}finishRenderPass(){this.adaptor.finishRenderPass(this.renderTarget)}renderStart({target:e,clear:t,clearColor:r,frame:s}){this._renderTargetStack.length=0,this.push(e,t,r,s),this.rootViewPort.copyFrom(this.viewport),this.rootRenderTarget=this.renderTarget,this.renderingToScreen=Pt(this.rootRenderTarget)}postrender(){this.adaptor.postrender?.(this.rootRenderTarget)}bind(e,t=!0,r,s){let i=this.getRenderTarget(e),o=this.renderTarget!==i;this.renderTarget=i,this.renderSurface=e;let u=this.getGpuRenderTarget(i);(i.pixelWidth!==u.width||i.pixelHeight!==u.height)&&(this.adaptor.resizeGpuRenderTarget(i),u.width=i.pixelWidth,u.height=i.pixelHeight);let l=i.colorTexture,d=this.viewport,c=l.pixelWidth,f=l.pixelHeight;if(!s&&e instanceof p&&(s=e.frame),s){let x=l._resolution;d.x=s.x*x+.5|0,d.y=s.y*x+.5|0,d.width=s.width*x+.5|0,d.height=s.height*x+.5|0}else d.x=0,d.y=0,d.width=c,d.height=f;return Mt(this.projectionMatrix,0,0,d.width/l.resolution,d.height/l.resolution,!i.isRoot),this.adaptor.startRenderPass(i,t,r,d),o&&this.onRenderTargetChange.emit(i),i}clear(e,t=y.ALL,r){t&&(e&&(e=this.getRenderTarget(e)),this.adaptor.clear(e||this.renderTarget,t,r,this.viewport))}contextChange(){this._gpuRenderTargetHash=Object.create(null)}push(e,t=y.ALL,r,s){let i=this.bind(e,t,r,s);return this._renderTargetStack.push({renderTarget:i,frame:s}),i}pop(){this._renderTargetStack.pop();let e=this._renderTargetStack[this._renderTargetStack.length-1];this.bind(e.renderTarget,!1,null,e.frame)}getRenderTarget(e){return e.isTexture&&(e=e.source),this._renderSurfaceToRenderTargetHash.get(e)??this._initRenderTarget(e)}copyToTexture(e,t,r,s,i){r.x<0&&(s.width+=r.x,i.x-=r.x,r.x=0),r.y<0&&(s.height+=r.y,i.y-=r.y,r.y=0);let{pixelWidth:o,pixelHeight:u}=e;return s.width=Math.min(s.width,o-r.x),s.height=Math.min(s.height,u-r.y),this.adaptor.copyToTexture(e,t,r,s,i)}ensureDepthStencil(){this.renderTarget.stencil||(this.renderTarget.stencil=!0,this.adaptor.startRenderPass(this.renderTarget,!1,null,this.viewport))}destroy(){this._renderer=null,this._renderSurfaceToRenderTargetHash.forEach((e,t)=>{e!==t&&e.destroy()}),this._renderSurfaceToRenderTargetHash.clear(),this._gpuRenderTargetHash=Object.create(null)}_initRenderTarget(e){let t=null;return A.test(e)&&(e=xe(e).source),e instanceof Q?t=e:e instanceof b&&(t=new Q({colorTextures:[e]}),A.test(e.source.resource)&&(t.isRoot=!0),e.once("destroy",()=>{t.destroy(),this._renderSurfaceToRenderTargetHash.delete(e);let r=this._gpuRenderTargetHash[t.uid];r&&(this._gpuRenderTargetHash[t.uid]=null,this.adaptor.destroyGpuRenderTarget(r))})),this._renderSurfaceToRenderTargetHash.set(e,t),t}getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||(this._gpuRenderTargetHash[e.uid]=this.adaptor.initGpuRenderTarget(e))}};var ee=[{type:"mat3x3<f32>",test:n=>n.value.a!==void 0,ubo:`
            var matrix = uv[name].toArray(true);
            data[offset] = matrix[0];
            data[offset + 1] = matrix[1];
            data[offset + 2] = matrix[2];
            data[offset + 4] = matrix[3];
            data[offset + 5] = matrix[4];
            data[offset + 6] = matrix[5];
            data[offset + 8] = matrix[6];
            data[offset + 9] = matrix[7];
            data[offset + 10] = matrix[8];
        `,uniform:`
            gl.uniformMatrix3fv(ud[name].location, false, uv[name].toArray(true));
        `},{type:"vec4<f32>",test:n=>n.type==="vec4<f32>"&&n.size===1&&n.value.width!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
            data[offset + 2] = v.width;
            data[offset + 3] = v.height;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height) {
                cv[0] = v.x;
                cv[1] = v.y;
                cv[2] = v.width;
                cv[3] = v.height;
                gl.uniform4f(ud[name].location, v.x, v.y, v.width, v.height);
            }
        `},{type:"vec2<f32>",test:n=>n.type==="vec2<f32>"&&n.size===1&&n.value.x!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y) {
                cv[0] = v.x;
                cv[1] = v.y;
                gl.uniform2f(ud[name].location, v.x, v.y);
            }
        `},{type:"vec4<f32>",test:n=>n.type==="vec4<f32>"&&n.size===1&&n.value.red!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
            data[offset + 3] = v.alpha;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                cv[3] = v.alpha;
                gl.uniform4f(ud[name].location, v.red, v.green, v.blue, v.alpha);
            }
        `},{type:"vec3<f32>",test:n=>n.type==="vec3<f32>"&&n.size===1&&n.value.red!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                gl.uniform3f(ud[name].location, v.red, v.green, v.blue);
            }
        `}];function Yi(n,e,t,r){let s=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
        var name = null;
        var arrayOffset = null;
    `],i=0;for(let u=0;u<n.length;u++){let l=n[u],d=l.data.name,c=!1,f=0;for(let x=0;x<ee.length;x++)if(ee[x].test(l.data)){f=l.offset/4,s.push(`name = "${d}";`,`offset += ${f-i};`,ee[x][e]||ee[x].ubo),c=!0;break}if(!c)if(l.data.size>1)f=l.offset/4,s.push(t(l,f-i));else{let x=r[l.data.type];f=l.offset/4,s.push(`
                    v = uv.${d};
                    offset += ${f-i};
                    ${x};
                `)}i=f}let o=s.join(`
`);return new Function("uv","data","offset",o)}function I(n,e){return`
        for (let i = 0; i < ${n*e}; i++) {
            data[offset + (((i / ${n})|0) * 4) + (i % ${n})] = v[i];
        }
    `}var jt={f32:`
        data[offset] = v;`,i32:`
        data[offset] = v;`,"vec2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];`,"vec3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];`,"vec4<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];`,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 4] = v[2];
        data[offset + 5] = v[3];`,"mat3x3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];
        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];`,"mat4x4<f32>":`
        for (let i = 0; i < 16; i++) {
            data[offset + i] = v[i];
        }`,"mat3x2<f32>":I(3,2),"mat4x2<f32>":I(4,2),"mat2x3<f32>":I(2,3),"mat4x3<f32>":I(4,3),"mat2x4<f32>":I(2,4),"mat3x4<f32>":I(3,4)},Ji=w(h({},jt),{"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
    `});export{y as a,or as b,gi as c,vi as d,Ge as e,pi as f,mi as g,wt as h,ee as i,Yi as j,jt as k,Ji as l,St as m,Ri as n,E as o,Rt as p};
