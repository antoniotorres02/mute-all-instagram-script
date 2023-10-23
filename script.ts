console.log('Hello World!');
import 'dotenv/config';
import { IgApiClient } from 'instagram-private-api';

const ig = new IgApiClient();
ig.state.generateDevice(process.env.IG_USERNAME as string);


( async () => {
    //Login
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(process.env.IG_USERNAME as string , process.env.IG_PASSWORD as string);
    process.nextTick(async () => await ig.simulate.postLoginFlow());
    //Get following
    const followingFeed = ig.feed.accountFollowing(loggedInUser.pk);
    const myFollowing = await followingFeed.items();
    //Mute all
    for (const user of myFollowing) {
        await ig.friendship.mutePostsOrStoryFromFollow({ targetPostsAuthorId: user.pk.toString() , targetReelAuthorId: user.pk.toString()});
        console.log(`Muted ${user.username}`);
        const time = Math.round(Math.random() * 1000) + 200;
        await new Promise(resolve => setTimeout(resolve, time));
    }
    //Mute recommendations
    console.log('Done');
})();

