require('dotenv').config();
const girlcollections_key = process.env.girlcollections_key;
const { EmbedBuilder } = require('discord.js');

module.exports = {
    subCommand: "pics.girls",
    
    async execute(interaction, client) { 
        let randOffset = Math.floor(Math.random() * (956 / 20))

        let data = await fetch(`https://api.tumblr.com/v2/blog/gaixinhchonloc.com/posts/photo?api_key=${girlcollections_key}&limit=20&offset=${randOffset}`).then(res => res.json());

        let randImg = Math.floor(Math.random() * 20)

        const girls = new EmbedBuilder()
                        .setColor('Blurple')
                        .setImage(data.response.posts[randImg].photos[0].original_size.url)

        return interaction.reply({embeds: [girls]})
    }
}


