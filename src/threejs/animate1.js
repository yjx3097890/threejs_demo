import { AnimationMixer, AnimationActions, AnimationClips, KeyframeTrack } from 'three';

// 动画片段（Animation Clips）
// 如果您已成功导入3D动画对象（无论它是否有骨骼或变形目标或两者皆有都不要紧）—— 例如使用glTF Blender导出器 从Blender导出它并使用GLTFLoader将其加载到three.js场景中 —— 其中一个响应字段应该是一个名为“animations”的数组， 其中包含此模型的AnimationClips（请参阅下面可用的加载器列表）。
//
// 每个AnimationClip通常保存对象某个活动的数据。 举个例子，假如mesh是一个角色，可能有一个AnimationClip实现步行循环， 第二个AnimationClip实现跳跃，第三个AnimationClip实现闪避等等。
//
// 关键帧轨道（Keyframe Tracks）
// 在这样的AnimationClip里面，每个动画属性的数据都存储在一个单独的KeyframeTrack中。 假设一个角色对象有Skeleton（骨架）， 一个关键帧轨道可以存储下臂骨骼位置随时间变化的数据， 另一个轨道追踪同一块骨骼的旋转变化，第三个追踪另外一块骨骼的位置、转角和尺寸，等等。 应该很清楚，AnimationClip可以由许多这样的轨道组成。
//
// 假设模型具有Geometry.morphTargets（变形目标）—— 例如一个变形目标显示一个笑脸，另一个显示愤怒的脸 —— 每个轨道都持有某个变形目标在AnimationClip运行期间产生的Mesh.morphTargetInfluences（变形目标影响）如何变化的信息。
//
// 动画混合器（Animation Mixer）
// 存储的数据仅构成动画的基础 —— 实际播放由AnimationMixer控制。 你可以想象这不仅仅是动画的播放器，而是作为硬件的模拟，如真正的调音台，可以同时控制和混合若干动画。
//
// 动画行为（Animation Actions）
// AnimationMixer本身只有很少的（大体上）属性和方法， 因为它可以通过AnimationActions来控制。 通过配置AnimationAction，您可以决定何时播放、暂停或停止其中一个混合器中的某个AnimationClip， 这个AnimationClip是否需要重复播放以及重复的频率， 是否需要使用淡入淡出或时间缩放，以及一些其他内容（例如交叉渐变和同步）。
//
// 动画对象组（Animation Object Groups）
// 如果您希望一组对象接收共享的动画状态，则可以使用AnimationObjectGroup。
//
// 支持的格式和加载器（Supported Formats and Loaders）
// 请注意，并非所有模型格式都包含动画（尤其是OBJ，没有）， 而且只有某些three.js加载器支持AnimationClip序列。 以下几个确实支持此动画类型：
//
// THREE.ObjectLoader
// THREE.BVHLoader
// THREE.ColladaLoader
// THREE.FBXLoader
// THREE.GLTFLoader
// THREE.MMDLoader
