console.log('Hello World!');
import 'dotenv/config';
import { IgApiClient } from 'instagram-private-api';

const ig = new IgApiClient();
ig.state.generateDevice(process.env.IG_USERNAME as string);

// Removed import statement for IgApiClient since it has already been imported in the first code block
( async () => {
    //Login
    await ig.simulate.preLoginFlow();
    console.log(process.env.IG_PASSWORD); // Debugging statement
    const loggedInUser = await ig.account.login(process.env.IG_USERNAME as string , process.env.IG_PASSWORD as string);
    process.nextTick(async () => await ig.simulate.postLoginFlow());
    //Get following
    const followingFeed = ig.feed.accountFollowing(loggedInUser.pk);
    const myFollowing = await followingFeed.items();
    //Mute all
    for (const user of myFollowing) {
        await ig.friendship.mutePostsOrStoryFromFollow({ targetPostsAuthorId: user.pk.toString() , targetReelAuthorId: user.pk.toString()});
        console.log(`Muted ${user.username}`);
        const time = Math.round(Math.random() * 6000) + 1000;
        await new Promise(resolve => setTimeout(resolve, time));
    }
    console.log('Done');
})();

