export default {
assets:{minecraft:{
blockstates:{
acacia_slab:{"minekhanId":1,"variants":{"type=bottom":{"model":"minecraft:block/acacia_slab"},"type=top":{"model":"minecraft:block/acacia_slab_top"}}}
},

models:{
block:{
block:{},
acacia_slab:{"parent":"minecraft:block/slab","textures":{"bottom":"minecraft:block/acacia_planks","side":"minecraft:block/acacia_planks","top":"minecraft:block/acacia_planks"}},
acacia_slab_top:{"parent":"minecraft:block/slab_top","textures":{"bottom":"minecraft:block/acacia_planks","side":"minecraft:block/acacia_planks","top":"minecraft:block/acacia_planks"}},
slab:{"textures":{"particle":"#side"},"elements":[{"from":[0,0,0],"to":[16,8,16],"faces":{"down":{"uv":[0,0,16,16],"texture":"#bottom","cullface":"down"},"up":{"uv":[0,0,16,16],"texture":"#top"},"north":{"uv":[0,8,16,16],"texture":"#side","cullface":"north"},"south":{"uv":[0,8,16,16],"texture":"#side","cullface":"south"},"west":{"uv":[0,8,16,16],"texture":"#side","cullface":"west"},"east":{"uv":[0,8,16,16],"texture":"#side","cullface":"east"}}}]},
slab_top:{"textures":{"particle":"#side"},"elements":[{"from":[0,8,0],"to":[16,16,16],"faces":{"down":{"uv":[0,0,16,16],"texture":"#bottom"},"up":{"uv":[0,0,16,16],"texture":"#top","cullface":"up"},"north":{"uv":[0,0,16,8],"texture":"#side","cullface":"north"},"south":{"uv":[0,0,16,8],"texture":"#side","cullface":"south"},"west":{"uv":[0,0,16,8],"texture":"#side","cullface":"west"},"east":{"uv":[0,0,16,8],"texture":"#side","cullface":"east"}}}]}
}
},

textures:{
block:{
acacia_planks:"0g0g9ËyY{řHâÐHĢVZĖ*HĩãWéîHýĻWĆkZ1210x0g0jO))U>OM3ÓGñIIGÀ3ÒÃO)O,(4àQQQQ-Sjî[äñá,T4á@QQá[(4î[]XX-S4î[]áá,Skî[QQX[T4à[ãäX-S4îQQQQ,Sjî)OO*,T3ññGGGG(3OQ)?QO(1010x0i0"
}
}

}}
}