import { write } from 'csvdata';
import { commerce, date, image, internet, lorem, name, random } from 'faker';

const generate = () => {
  const users = [...new Array(100)].map(() => ({
    _id: random.uuid(),
    avatarUrl: image.avatar(),
    displayName: name.findName(),
    email: internet.email(),
    userName: internet.userName(),
  }));

  const userHeaders = Object.keys(users[0]).join(',');
  write('./users.csv', users, { header: userHeaders });

  const channels = [...new Array(20)].map(() => ({
    _id: random.uuid(),
    coverImage: image.image(),
    name: commerce.productName(),
  }));

  const channelHeaders = Object.keys(channels[0]).join(',');
  write('./channels.csv', channels, { header: channelHeaders });

  const messages: any[] = [];
  channels.forEach(channel => {
    const numberOfMessages = random.number({ min: 10000, max: 100000 });

    const messagesForChannel = [...new Array(numberOfMessages).keys()].map(
      () => ({
        _id: random.uuid(),
        channelId: channel._id,
        createdAt: date
          .recent(random.number({ min: 0, max: 30 }))
          .toISOString(),
        message: lorem.sentence(),
        userId: users[random.number({ min: 0, max: 99 })]._id,
      })
    );

    messages.push(...messagesForChannel);
  });

  const messageHeaders = Object.keys(messages[0]).join(',');
  write('./messages.csv', messages, { header: messageHeaders });
};

generate();
