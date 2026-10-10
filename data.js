/* 所有展示文案、人物、图片与视频链接都在这里编辑。
 * 图片示例：image: "assets/my-photo.jpg"，封面：cover: "assets/my-cover.jpg"。
 * 链接示例：url: "https://你确认过的链接"。留空会显示“待补链接”。
 * 当前条目都是私人收藏的编辑提示，不是官方事实或真实事件记录。
 */
window.UNIVERSE_DATA = {
  title: '我的精神宇宙', subtitle: '收藏那些让我重新有感觉的人和瞬间',
  ui: {
    headerNote: '一间只属于我的记忆房间', eyebrow: '给心里亮着的那些星',
    intro: '有些光不必解释。把让我停下、心动、重新出发的瞬间，轻轻放在这里。',
    collection: '我的精神坐标', collectionNote: '三个入口，三种让心重新亮起的方式',
    enter: '走进这个房间', back: '返回我的宇宙', room: '私人精神档案',
    tags: '此刻，想靠近哪一种力量？', emotions: '带着今天的心情进来',
    all: '全部', theme: '房间的光', pink: '粉色', blue: '天蓝色',
    pending: '待补链接', open: '打开收藏', placeholder: '留给未来的一张照片',
    empty: '这里暂时没有符合筛选的记忆。换一个标签，或让心情重新出发。',
    reset: '清除筛选', count: '段记忆', filtered: '当前筛选',
    note: '这里的文字是私人感受与待填写提示，留给你自己的记忆。',
    footer: '把喜欢留在这里，把力量带回生活。', footerNote: '私人收藏 · 内容随你慢慢补完',
    sections: ['入坑路径', '精神坐标', '强者时刻', '群像关系', '高光舞台', '物料收藏', '视觉收藏', '情绪入口', '我的注释']
  },
  people: [
    {
      id: 'family', name: 'TF家族 / 时代少年团', english: 'TF FAMILY / TNT',
      theme: 'gold', cover: '', symbol: '✦', keywords: ['家人感', '一起长大', '少年感'],
      description: '人群里的暖光，和一起长大的勇气。',
      roomDescription: '把群像、舞台光和那些像家一样的瞬间，收进一间暖金色的房间。',
      tags: ['家人感', '一起长大', '舞台光'], emotions: ['想被陪伴', '需要勇气', '想念'],
      memories: [
        { section: '入坑路径', title: '从哪一道光开始', text: '待填写：第一次被吸引的画面、当时的心情，以及为什么愿意继续看下去。', tags: ['一起长大'], emotions: ['想念'], image: '', url: '' },
        { section: '精神坐标', title: '一起走，比独自走更温暖', text: '想收藏的感受：有人并肩时，成长好像也多了一点底气。', tags: ['家人感'], emotions: ['想被陪伴'], image: '', url: '' },
        { section: '强者时刻', title: '灯光亮起之前', text: '待收藏：让我感受到坚持的片段。把时间、出处和自己的感受一起记下来。', tags: ['舞台光'], emotions: ['需要勇气'], image: '', url: '' },
        { section: '群像关系', title: '我喜欢的并肩感', text: '待填写：某一次互动里让我感到温暖的细节。只记录我看见的画面与感受。', tags: ['家人感'], emotions: ['想被陪伴'], image: '', url: '' },
        { section: '高光舞台', title: '想再看一次的暖光', text: '待填写舞台名称、日期与确认过的来源链接。', tags: ['舞台光'], emotions: ['需要勇气'], image: '', url: '' },
        { section: '物料收藏', title: '留一个位置给日常', text: '待收藏：访谈、幕后或日常片段。喜欢的细节不必很宏大。', tags: ['一起长大'], emotions: ['想被陪伴'], image: '', url: '' },
        { section: '视觉收藏', title: '一张像回忆的照片', text: '把你有权使用的图片放进 assets 文件夹，再在这里填写图片路径。', tags: ['舞台光'], emotions: ['想念'], image: '', url: '', visual: true },
        { section: '情绪入口', title: '今天，想有人陪着', text: '留给疲惫的一天：先回到这片暖光里，慢慢呼吸。', tags: ['家人感'], emotions: ['想被陪伴'], image: '', url: '' },
        { section: '我的注释', title: '写给一起长大的自己', text: '待填写：这份喜欢给了我什么？我想把哪一点力量带回自己的生活？', tags: ['一起长大'], emotions: ['想念'], image: '', url: '' }
      ]
    },
    {
      id: 'su', name: '苏新皓', english: 'SU XIN HAO', theme: 'red', cover: '', symbol: '✷',
      keywords: ['创意', '持续营业', '强者感'], description: '聚光灯下的火焰，也照亮继续向前的我。',
      roomDescription: '把舞台、练习室和让我想继续努力的瞬间，放进这束红色的光里。',
      tags: ['创意', '坚持', '舞台掌控'], emotions: ['想重新出发', '需要勇气', '想充电'],
      memories: [
        { section: '入坑路径', title: '那个让我停下的瞬间', text: '待填写：第一次注意到他的片段，以及最先击中我的那个细节。', tags: ['舞台掌控'], emotions: ['想充电'], image: '', url: '' },
        { section: '精神坐标', title: '把想法变成自己的光', text: '想收藏的感受：创意给我提醒，我也可以认真对待自己的想法。', tags: ['创意'], emotions: ['想重新出发'], image: '', url: '' },
        { section: '强者时刻', title: '再练一次的力量', text: '待收藏：让我感受到努力与坚持的真实片段，并补上来源。', tags: ['坚持'], emotions: ['需要勇气'], image: '', url: '' },
        { section: '群像关系', title: '并肩时的火花', text: '待填写：我喜欢的一次合作或互动，和它带给我的感受。', tags: ['创意'], emotions: ['想充电'], image: '', url: '' },
        { section: '高光舞台', title: '让心跳加速的一束光', text: '待填写舞台名称、日期和确认过的视频链接。', tags: ['舞台掌控'], emotions: ['想充电'], image: '', url: '' },
        { section: '物料收藏', title: '收藏创意发生的地方', text: '待收藏：练习、幕后或表达想法的片段。记录让我心动的细节。', tags: ['创意'], emotions: ['想重新出发'], image: '', url: '' },
        { section: '视觉收藏', title: '红色房间的留白', text: '留给一张舞台照片或你自己的收藏拼贴。', tags: ['舞台掌控'], emotions: ['想充电'], image: '', url: '', visual: true },
        { section: '情绪入口', title: '借一点继续向前的火', text: '当我想放弃时，回来看看让我重新有动力的瞬间。', tags: ['坚持'], emotions: ['需要勇气'], image: '', url: '' },
        { section: '我的注释', title: '我的努力也值得被看见', text: '待填写：被触动之后，我想为自己做的一件小事。', tags: ['坚持'], emotions: ['想重新出发'], image: '', url: '' }
      ]
    },
    {
      id: 'jung', name: '郑雅贤', english: 'JUNG YA HYUN', theme: 'pink', cover: '', symbol: '❋',
      keywords: ['中文连接感', '表情管理', '舞台掌控'], description: '在花与麦克风之间，收藏心动的连接。',
      roomDescription: '用粉色或天蓝色安放此刻的喜欢。这是我的房间配色，留给温柔与清透的心情。',
      tags: ['中文连接感', '表情管理', '舞台掌控'], emotions: ['想被治愈', '想充电', '需要勇气'],
      memories: [
        { section: '入坑路径', title: '心动是从这里开始的', text: '待填写：第一次被吸引的画面。把自己的感受放在故事的开头。', tags: ['表情管理'], emotions: ['想被治愈'], image: '', url: '' },
        { section: '精神坐标', title: '那一点靠近的感觉', text: '待收藏：让我感受到中文连接感的真实片段，以及它对我的意义。', tags: ['中文连接感'], emotions: ['想被治愈'], image: '', url: '' },
        { section: '强者时刻', title: '握住属于自己的舞台', text: '待收藏：让我感受到舞台掌控的瞬间，请补上可靠来源。', tags: ['舞台掌控'], emotions: ['需要勇气'], image: '', url: '' },
        { section: '群像关系', title: '舞台之外的连接', text: '待填写：我喜欢的合作或互动，不推测未被确认的关系。', tags: ['中文连接感'], emotions: ['想被治愈'], image: '', url: '' },
        { section: '高光舞台', title: '一支麦克风，一束光', text: '待填写舞台名称、日期和自己确认过的链接。', tags: ['舞台掌控'], emotions: ['想充电'], image: '', url: '' },
        { section: '物料收藏', title: '值得反复看的细节', text: '待收藏：访谈、舞台或幕后里的一个表情、一句话。', tags: ['表情管理'], emotions: ['想充电'], image: '', url: '' },
        { section: '视觉收藏', title: '给花与光留一个位置', text: '粉色与天蓝色都是私人收藏主题，并非官方应援色。', tags: ['表情管理'], emotions: ['想被治愈'], image: '', url: '', visual: true },
        { section: '情绪入口', title: '今天，给自己一点温柔', text: '把让我松一口气的片段放在这里，允许自己慢慢恢复。', tags: ['中文连接感'], emotions: ['想被治愈'], image: '', url: '' },
        { section: '我的注释', title: '喜欢让我重新有感觉', text: '待填写：这个瞬间为什么击中我？我想如何记住它？', tags: ['舞台掌控'], emotions: ['需要勇气'], image: '', url: '' }
      ]
    }
  ]
};
