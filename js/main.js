// Flatpickr 配置
flatpickr("#dateInput", {
    locale: "en",
    dateFormat: "Y-m-d",
    position: "below",
    appendTo: document.body,
    open: function(selectedDates, dateStr, calendar) {
        const input = document.querySelector('.date-input');
        const calendarContainer = calendar.calendarContainer;
        calendarContainer.style.position = 'absolute';
        calendarContainer.style.top = input.offsetTop + input.offsetHeight + 'px';
        calendarContainer.style.left = input.offsetLeft + 'px';
        calendarContainer.style.zIndex = '9999';
    }
});


// 周易卦象数据
const hexagramData = [
{
    name: "Qian (Heaven) Hexagram",
    explanation: "It symbolizes Heaven, representing creativity and leadership. It also symbolizes an upward - moving trend and unlimited potential. This hexagram encourages people to be positive and upward - looking, constantly pursue excellence, strive to achieve their own goals and ideals, and at the same time reminds people to follow the laws of nature, maintain neutrality and integrity.",
    fortune: "People with the Qian hexagram have a pioneering spirit and leadership ability. They are suitable for leadership positions to exert their talents and lead the team to success. In their careers, people with the Qian hexagram have a strong sense of enterprise and enthusiasm, and can continuously explore new fields and markets, creating more opportunities and possibilities.",
    },
    {
    name: "Kun (Earth) Hexagram",
    explanation: "It symbolizes the earth, representing inclusiveness and nurturing, implying the characteristic of the earth carrying all things. This hexagram teaches people to treat others and things with a tolerant and accepting attitude like the earth, and at the same time pay attention to the accumulation and cultivation of the inner self, in order to develop a gentle and inclusive heart.",
    fortune: "People with the Kun hexagram have gentle, inclusive, modest, and virtuous qualities, and can get along harmoniously with others. They are good at listening to and understanding others' ideas and needs, thereby establishing good interpersonal relationships and reputation, and laying a solid foundation for personal development.",
    },
    {
    name: "Zhen (Thunder) Hexagram",
    explanation: "It symbolizes thunder, indicating a state of shock, vibration, and awakening. This hexagram reminds people to stay alert and sharp, to perceive changes in the surrounding environment and potential risks in a timely manner, and also encourages people to have the courage and determination to deal with and overcome difficulties and challenges when facing them.",
    fortune: "People with the Zhen hexagram usually have a strong desire for exploration and a pioneering spirit, and like to accept new challenges and try new things. In their careers, people with the Zhen hexagram are suitable for fields that require innovation and breakthroughs, and can continuously drive themselves and their teams forward, creating new achievements.",
    },
    {
    name: "Xun (Wind) Hexagram",
    explanation: "It symbolizes the wind, representing the softness, gradualness, and permeability of the wind. The Xun hexagram tells us that we should influence and change the things around us in a gentle but powerful way like the wind, and at the same time pay attention to our own inner cultivation and improvement, in order to enhance our own influence and attractiveness.",
    fortune: "People with the Xun hexagram usually have gentle, modest, flexible, and adaptable characteristics, and are good at communicating and coordinating with others, and can adapt well to various environments and situations. In their careers, people with the Xun hexagram are suitable for fields that require interaction with people, such as sales, market promotion, public relations, etc., and can win the trust and support of customers and partners through their own communication ability.",
    },
    {
    name: "Kan (Water) Hexagram",
    explanation: "It symbolizes water, representing danger, difficulty, and challenge, and also implies the flexibility and adaptability of water. This hexagram teaches people to stay calm and composed when facing difficulties and challenges, to adopt appropriate methods and strategies to resolve crises, and also emphasizes the importance of inner firmness and belief.",
    fortune: "People with the Kan hexagram usually have an unyielding will and the determination to overcome difficulties, and can constantly grow and progress in adversity. In their careers, people with the Kan hexagram are suitable for fields that require dealing with complex problems and responding to risks, such as finance, law, medicine, etc., and can overcome various difficulties with their own wisdom and courage, and achieve success.",
    },
    {
    name: "Li (Fire) Hexagram",
    explanation: "It symbolizes fire, representing light, enthusiasm, and passion. The Li hexagram tells us that we should face life and work with a positive, enthusiastic, and bright attitude like fire, and at the same time pay attention to our own cultivation and improvement, in order to enhance our own influence and leadership.",
    fortune: "People with the Li hexagram usually have enthusiasm, vitality, and creativity, and can infect and inspire the people around them. In their careers, people with the Li hexagram are suitable for fields that require display and expression, such as art, culture, education, etc., and can achieve success with their own enthusiasm and creativity.",
    },
    {
    name: "Gen (Mountain) Hexagram",
    explanation: "It symbolizes a mountain, representing stillness, stability, and firmness. The Gen hexagram teaches people to learn to be still and stable, control their own emotions and desires, and at the same time pay attention to their own cultivation and improvement, in order to enhance their own inner strength and composure.",
    fortune: "People with the Gen hexagram usually have calm, reserved, self - disciplined, and firm characteristics, and can remain calm and rational in complex situations, and make correct decisions. In their careers, people with the Gen hexagram are suitable for jobs that require stability and concentration, such as scientific research, engineering technology, etc., and can achieve success with their own focus and perseverance.",
    },
    {
    name: "Dui (Marsh) Hexagram",
    explanation: "It symbolizes a marsh, representing joy, pleasure, and harmony. The Dui hexagram teaches people to face life and work with a joyful and pleasant attitude, establish harmonious relationships with others, and at the same time pay attention to their own inner emotions and feelings.",
    fortune: "People with the Dui hexagram usually have amiable, friendly, optimistic, and cheerful characteristics, and can establish good interpersonal relationships with others, and gain others' favor and trust. In their careers, people with the Dui hexagram are suitable for fields that require communication and cooperation with others, such as service industry, consulting industry, etc., and can achieve success with their own affinity and communication ability.",
}
];

let isLoading = false;

//信息输入
function calculateFortune() {
    if (isLoading) return;

    const name = document.getElementById('nameInput').value;
    const birthDate = new Date(document.getElementById('dateInput').value);
    const birthHour = document.getElementById('hourInput').value;

    if (!name || !birthDate || birthHour === "") {
        return alert("Please complete all fields: Name, Birth Date, and Birth Hour.");
    }

    isLoading = true;

//加载
    const loadingGif = document.querySelector('.loading');
    loadingGif.style.display = 'block';

    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'none';

    setTimeout(() => {
        loadingGif.style.display = 'none';

        const birthDay = birthDate.getDate();
        const birthMonth = birthDate.getMonth() + 1;

        const zodiac = getZodiacSign(birthMonth, birthDay);
        const animal = getChineseZodiac(birthDate);
        const timeFortune = getTimeFortune(birthHour);
        const element = getWuXing(zodiac, animal);
        const fortune = getFortuneAnalysis(zodiac);
        const hexagram = getHexagramAnalysis();
        const recommendedProduct = getRecommendedProduct();

        resultDiv.innerHTML = `
            <h3>Comprehensive divination results</h3>
            <div class="row">
                <div class="col-md-6">
                    <div class="analysis-item">
                        <h4>Full Name</h4>
                        ${name}
                    </div>
                    <div class="analysis-item">
                        <h4>Date of Birth</h4>
                        ${birthDate.toLocaleDateString()}
                    </div>
                    <div class="analysis-item">
                        <h4>Constellation</h4> 
                        ${zodiac}<br>
                    </div>
                    <div class="analysis-item">
                        <h4>Chinese Zodiac</h4> 
                        ${animal}<br>
                        ${getAnimalExplanation(animal)}
                    </div>
                    <div class="analysis-item">
                        <h4>Five Elements</h4> 
                        ${element}
                    </div>
                    <div class="analysis-item">
                        <h4>Hourly Impact</h4> 
                        ${timeFortune}
                    </div>
                    <div class="analysis-item">
                        <h4>Recommended Products</h4>
                        <div id="productRecommendation" style="text-align: center;">
                            It might be more suitable for you<br>
                            <a href="${recommendedProduct.url}" target="_blank">
                            <img src="${recommendedProduct.image}" alt="Recommended Product" style="max-width: 200px; margin: 10px;"></a>
                            <p>${recommendedProduct.description}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="analysis-item">
                        <h4>Horoscope Analysis</h4>
                        ${fortune}
                    </div>
                    <div class="analysis-item">
                        <h4>Zhouyi Hexagram Analysis</h4>
                        ${hexagram}
                    </div>
                </div>
            </div>
        `;
        resultDiv.style.display = 'block';
        isLoading = false;
    }, 2800);
}

// 获取星座
function getZodiacSign(month, day) {
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
    else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "Gemini";
    else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "Cancer";
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 22)) return "Scorpio";
    else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return "Sagittarius";
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
}

// 获取生肖
function getChineseZodiac(birthDate) {
    const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Sheep', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    const year = birthDate.getFullYear();
    const index = (year - 1900) % 12;
    return animals[index];
}

// 获取五行，星座五行、生肖五行
function getWuXing(zodiac, animal) {
    const wuXing = {
            "Aquarius": "Water",
            "Pisces": "Water",
            "Aries": "Fire",
            "Taurus": "Earth",
            "Gemini": "Wood",
            "Cancer": "Metal",
            "Leo": "Fire",
            "Virgo": "Earth",
            "Libra": "Metal",
            "Scorpio": "Water",
            "Sagittarius": "Wood",
            "Capricorn": "Earth",
            "Monkey": "Metal",
            "Rooster": "Metal",
            "Dog": "Earth",
            "Pig": "Water",
            "Rat": "Water",
            "Ox": "Earth",
            "Tiger": "Wood",
            "Rabbit": "Wood",
            "Dragon": "Earth",
            "Snake": "Fire",
            "Horse": "Fire",
            "Sheep": "Earth"
    };
    return `Constellation Five Elements:${wuXing[zodiac]}<br>Chinese Zodiac Five Elements:${wuXing[animal]}`;  
}

// 生肖解释
function getAnimalExplanation(animal) {
    const explanations = {
        "Rat": "Intelligent and alert, good at managing finances",
        "Ox": "Diligent and hard - working, with great patience",
        "Tiger": "Brave and fearless, with leadership ability",
        "Rabbit": "Gentle and kind, with agile thinking",
        "Dragon": "Enthusiastic and confident, creative",
        "Snake": "Wise and calm",
        "Horse": "Full of energy and optimistic",
        "Sheep": "Kind and compassionate, pursuing harmony",
        "Monkey": "Witty and flexible, sociable",
        "Rooster": "Pay attention to details,do things in an orderly way",
        "Dog": "Loyal and reliable, fair and impartial",
        "Pig": "Gentle in character, sincere in dealing with people"
    };

    return explanations[animal];
}

// 时间运势
function getTimeFortune(birthHour) {
    const timeFortune = {
        "Zi": "Nourishing the Hidden Dragon, at this moment, you possess tremendous latent power. This power is like a dragon in a deep pool, quietly accumulating energy in the dark.",
        "Chou": "Full of Energy, at this moment, you are like an ox, full of strength. Every cell of your body is vibrant with energy, and you can start to engage in activities that require physical strength and energy.",
        "Yin": "Courageous and Enterprising, at this moment, you are like a roaring tiger that has just woken up, full of energy and enthusiasm, and your body and mind are in an extremely active state, moving forward bravely.",
        "Mao": "Gentle Progress, at this moment, you are like a rabbit that jumps out of the mountain at dawn, with its three - lobed mouth hopping and jumping. Your actions are no longer low - key and hidden, but steadily moving forward step by step.",
        "Chen": "The Dragon Soars in the Sky, at this moment, you are like a dragon soaring in the sky, with favorable fortune, which is conducive to making important decisions.",
        "Si": "Cunning and Hidden Dragon, at this moment, you are as cunning as a snake, perhaps a bit hypocritical and pretentious, but you have great insight into problems.",
        "Wu": "At the Zenith of the Sun, at this moment, you are like a dragon shedding its scales, showing a majestic and imposing momentum. The spirit of the dragon is inspired, and you can realize your ambitions.",
        "Wei": "Gentle in the Wild, at this moment, you are like a dragon that has just come down from the mountain, with a lot of energy that needs to be consumed. But every two hours, the dragon still needs to return to the mountain to absorb energy.",
        "Shen": "Playful as a Dragon, at this moment, you are like a playful and lively monkey, full of restless nature. You are witty and flexible, curious about the things around you, and like to try all kinds of new things.",
        "You": "The Golden Rooster Stands Alone, at this moment, you are like a standing and independent golden rooster, with a high - spirited air. You have a strong ability to spread information and can accurately obtain valuable information.",
        "Xu": "Loyal and Watchful, at this moment, you are like a loyal dog, always guarding your home.",
        "Hai": "Tolerant and Peaceful, at this moment, you are like a pig with a strong heart of tolerance, able to accept and accommodate different things, and have a peaceful state of mind."
    };

    return timeFortune[birthHour];
}

// 运势分析
function getFortuneAnalysis(zodiac) {
    const fortune = {
        "Aquarius": "You are a highly creative person, and you will have new inspiration coming in recently. When encountering problems, don't rush to draw conclusions. Think from multiple angles, and you will find unique solutions. In your career, your innovative thinking is likely to be recognized. You might as well boldly try new projects, but pay attention to your communication style to avoid misunderstandings due to being too direct. In love, your romantic sentiment and free - seeking personality attract others. In interpersonal relationships, you are good at listening to and understanding others' ideas, which makes you an easy - to - be mediator among friends.",
        "Pisces": "You are full of tenderness in your heart and easily touched by emotions. In terms of feelings, you are good at understanding and empathizing with others' feelings, which enables you to get along well with others in interpersonal relationships, but you may also be easily hurt as a result. Your intuition is relatively sharp, which may be helpful for you in dealing with some complex emotional issues. However, being too dependent on intuition may lead to irrational decision - making, especially when facing important issues. Therefore, you need to pay attention to cultivating your rational thinking.",
        "Aries": "You are full of passion and energy, and dare to try new things. In your career, you have strong leadership ability and can lead the team to complete tasks. However, your impulsiveness may cause you to be not calm enough when making decisions. In interpersonal relationships, your enthusiasm and cheerfulness easily attract others, but you may also hurt others because of being too straightforward.",
        "Taurus": "You are steady - minded and focus on material and a sense of security. Your diligence and patience enable you to achieve good results in your work. You value family and material life, and strive to create better living conditions for your family. However, you may sometimes be too stubborn and unwilling to accept others' opinions. In terms of emotions, you are loyal and reliable, and have a strong sense of responsibility to your partner and friends.",
        "Gemini": "You have agile thinking, wide - ranging interests, and are good at interpersonal communication. Your versatility and good communication skills make you very popular in social occasions. However, your attention is easily distracted, which may lead to lack of concentration in doing things, thus affecting work efficiency.",
        "Cancer": "You are emotionally rich and attach great importance to your family. Your love and care make you very popular in your family and among friends. You are good at listening to and understanding others' ideas, and can get along well with others in interpersonal relationships. However, you may be too sensitive and emotional, which may cause you to be not calm and rational enough when dealing with problems.",
        "Leo": "You have strong leadership and love being in the spotlight. Your self - confidence and enthusiasm can attract others' attention. In your career, you have strong leadership ability and can lead the team to complete tasks. However, your pride and arrogance may make you appear not humble enough when dealing with interpersonal relationships, thus causing others' dissatisfaction.",
        "Virgo": "You are meticulous and serious in doing things, and pursue perfection. Your attention to detail and caution enable you to achieve good results in your work. You focus on details and quality, and can often find problems that others overlook in your work. However, you may be too demanding of yourself and others, which may lead to your overwork and too high expectations of others.",
        "Libra": "You are good at balancing the interests of all parties and pursuing harmony. Your elegance and affability make you very popular in social occasions. You are good at communication and coordination, and can find common points among different groups of people. However, your indecisiveness may lead to wasting time when making decisions.",
        "Scorpio": "You are mysterious and charming, and have a strong inner self. Your firmness and determination enable you to persevere when facing difficulties. You have strong insight and intuition, and can see through the essence of things. However, your suspiciousness and jealousy may lead to your distrust of others, thus affecting interpersonal relationships.",
        "Sagittarius": "You are optimistic and cheerful, and yearn for freedom. Your enthusiasm and vitality make you very popular in social occasions. You have a strong curiosity and thirst for knowledge, and like to explore new things. However, your impulsiveness and lack of patience may lead to not being cautious enough when making decisions, thus bringing trouble to yourself.",
        "Capricorn": "You are down - to - earth and hard - working, and have a firm goal. Your sense of responsibility and determination enable you to achieve success in your career. You focus on practicality and stability, and can create stable conditions for yourself and your family in life. However, you may be too conservative and cautious, thus missing some opportunities for development."
    };

    return fortune[zodiac];
}

// 卦象生成
function getHexagramAnalysis() {
    const hexagram = getRandomHexagram();
    return `${hexagram.name}<br>${hexagram.explanation}<br><br>Fortune Analysis:${hexagram.fortune}`;
}

// 随机获取卦象
function getRandomHexagram() {
    const randomIndex = Math.floor(Math.random() * hexagramData.length);
    return hexagramData[randomIndex];
}

// 随机推荐商品
function getRecommendedProduct() {
    const products = [
        {   name: "Pteris",
            description: "",
            url: "https://zensavorr.com/products/red-dwarf-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/36.1.webp?v=1740045623&width=600"
        },
        {   name: "Bloody eye",
            description: "",
            url: "https://zensavorr.com/products/bloody-eye-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/1.1_c5ec5982-bdbc-4d27-aaf2-0819d64965b5.webp?v=1740047111&width=600"
        },
        {   name: "Ice Crystal",
            description: "",
            url: "https://zensavorr.com/products/ice-crystal-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/3.1_d6226bb1-3054-461d-94b3-8611f41651dd.webp?v=1740047054&width=600"
        },
        {   name: "Chomper",
            description: "",
            url: "https://zensavorr.com/products/chomper-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/4.1.webp?v=1740047009&width=600"
        },
        {   name: "Peacock",
            description: "",
            url: "https://zensavorr.com/products/peacock-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/37.1.webp?v=1740046984&width=600"
        },
        {   name: "Cosmos Glaze",
            description: "",
            url: "https://zensavorr.com/products/cosmos-glaze-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/38.1.webp?v=1740046962&width=493"
        },
        {   name: "Deep sea",
            description: "",
            url: "https://zensavorr.com/products/deep-sea-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/19.1.webp?v=1740046892&width=493"
        },
        {   name: "Isolated Island",
            description: "",
            url: "https://zensavorr.com/products/isolated-island-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/26.1.webp?v=1740046854&width=493"
        },
        {   name: "Discerning Eye",
            description: "",
            url: "https://zensavorr.com/products/discerning-eye-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/20.1.webp?v=1740046815&width=493"
        },
        {   name: "Broken eye",
            description: "",
            url: "https://zensavorr.com/products/broken-eye-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/15.1.webp?v=1740046781&width=493"
        },
        {   name: "Jellyfish",
            description: "",
            url: "https://zensavorr.com/products/jellyfish-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/25.1.webp?v=1740046738&width=493"
        },
        {   name: "Dandelion",
            description: "",
            url: "https://zensavorr.com/products/dandelion-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/27.1.webp?v=1740046702&width=493"
        },
        {   name: "Emerald Amber",
            description: "",
            url: "https://zensavorr.com/products/emerald-amber-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/5.1.webp?v=1740046613&width=493"
        },
        {   name: "Verdant Ink",
            description: "",
            url: "https://zensavorr.com/products/verdant-ink-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/10.1_7717381a-d7dc-45ae-b3a4-002c838a54f8.webp?v=1740046565&width=493"
        },
        {   name: "Azure Blossom",
            description: "",
            url: "https://zensavorr.com/products/azure-blossom-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/9.1.webp?v=1740046533&width=493"
        },
        {   name: "Yin-Yang",
            description: "",
            url: "https://zensavorr.com/products/yin-yang-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/11.1.webp?v=1740046503&width=493"
        },
        {   name: "Royalty",
            description: "",
            url: "https://zensavorr.com/products/royalty-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/12.1.webp?v=1740046471&width=493"
        },
        {   name: "Peach Blossom",
            description: "",
            url: "https://zensavorr.com/products/peach-blossom-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/14.1.webp?v=1740046444&width=493"
        },
        {   name: "Jurassic",
            description: "",
            url: "https://zensavorr.com/products/jurassic-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/23.1.webp?v=1740046378&width=493"
        },
        {   name: "Ethereal Spirit",
            description: "",
            url: "https://zensavorr.com/products/ethereal-spirit-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/8.1.webp?v=1740046328&width=493"
        },
        {   name: "Nebula",
            description: "",
            url: "https://zensavorr.com/products/nebula-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/24.1.webp?v=1740046288&width=493"
        },
        {   name: "Crimson Tide",
            description: "",
            url: "https://zensavorr.com/products/crimson-tide-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/17.1.webp?v=1740046244&width=493"
        },
        {   name: "Seal",
            description: "",
            url: "https://zensavorr.com/products/seal-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/18.1.webp?v=1740046219&width=493"
        },
        {   name: "Dappled Earth",
            description: "",
            url: "https://zensavorr.com/products/dappled-earth-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/16.1.webp?v=1740046173&width=493"
        },
        {   name: "Chaos",
            description: "",
            url: "https://zensavorr.com/products/chaos-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/7.1.webp?v=1740046123&width=493"
        },
        {   name: "Celestial",
            description: "",
            url: "https://zensavorr.com/products/celestial-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/28.1.webp?v=1740046092&width=493"
        },
        {   name: "Scarlet Rose",
            description: "",
            url: "https://zensavorr.com/products/scarlet-rose-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/30.1.webp?v=1740048418&width=493"
        },
        {   name: "Emerald Mountains",
            description: "",
            url: "https://zensavorr.com/products/emerald-mountains-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/10.1.webp?v=1740046035&width=493"
        },
        {   name: "Aurora",
            description: "",
            url: "https://zensavorr.com/products/aurora-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/29.1.webp?v=1740045991&width=493"
        },
        {   name: "Martian Elixir",
            description: "",
            url: "https://zensavorr.com/products/martian-elixir-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/31.1.webp?v=1740045943&width=493"
        },
        {   name: "Jovian Chalice",
            description: "",
            url: "https://zensavorr.com/products/jovian-chalice-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/33.1.webp?v=1740045922&width=493"
        },
        {   name: "Globe",
            description: "",
            url: "https://zensavorr.com/products/globe-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/21.1.webp?v=1740045878&width=493"
        },
        {   name: "Porcelain Blossom",
            description: "",
            url: "https://zensavorr.com/products/porcelain-blossom-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/34.1.webp?v=1740045835&width=493"
        },
        {   name: "Sulfur Sky",
            description: "",
            url: "https://zensavorr.com/products/sulfur-sky-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/35.1.webp?v=1740045747&width=493"
        },
        {   name: "Ringed Planet",
            description: "",
            url: "https://zensavorr.com/products/ringed-planet-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/6.1.webp?v=1740045791&width=493"
        },
        {   name: "Abyss",
            description: "",
            url: "https://zensavorr.com/products/abyss-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/32.1.webp?v=1740045713&width=493"
        },
        {   name: "Red Dwarf",
            description: "",
            url: "https://zensavorr.com/products/red-dwarf-jianzhan-tea-cup",
            image: "https://zensavorr.com/cdn/shop/files/36.1.webp?v=1740045623&width=493"
        },

    ];

    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
}
