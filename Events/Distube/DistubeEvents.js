const { EmbedBuilder } = require('discord.js')
const client = require('../../index')

const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({
      embeds: [new EmbedBuilder()
        .setColor("Green")
        .setTitle(`PLAY`)
        .setDescription(
          `🎵  **Playing: [${song.name}](${song.url})**
                    \n${status(queue)}`)
        .setThumbnail(song.thumbnail)
      ]
    })
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send({
      embeds: [new EmbedBuilder()
        .setColor("Green")
        .setTitle(`ADD`)
        .setDescription(
          `🎶  **Added [${song.name}](${song.url})** - \`${song.formattedDuration}\``)
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Requested by ${song.user.tag}`, iconURL: song.user.displayAvatarURL() })
      ]
    })
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send({
      embeds: [new EmbedBuilder()
        .setColor("Green")
        .setTitle("PLAYLIST")
        .setDescription(`🎶 \`${playlist.name}\``)
        .addFields({ name: `**Track**`, value: `${playlist.songs.length}` })
        .setThumbnail(playlist.thumbnail)
      ]
    })
  )
  .on('error', (channel, e) => {
    if (channel) channel.send({
      embeds: [new EmbedBuilder()
        .setColor('DarkRed')
        .setDescription(`An error encountered: ${e.toString().slice(0, 1974)}`)
      ]
    });
    else console.error(e)
  })
  .on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`No result found for \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send({
    embeds: [new EmbedBuilder()
      .setColor('Green')
      .setDescription('☑️ Finished!')
    ]
  })
  )