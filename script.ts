console.log('Starting script');
import 'dotenv/config';
import { AccountFollowingFeedResponse, AccountFollowingFeedResponseUsersItem, IgApiClient } from 'instagram-private-api';

const ig = new IgApiClient();
ig.state.generateDevice(process.env.IG_USERNAME as string);


( async () => {
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(process.env.IG_USERNAME as string , process.env.IG_PASSWORD as string);
    process.nextTick(async () => await ig.simulate.postLoginFlow());
    ig.challenge.auto(true);
    //Get following
    const followingFeed = ig.feed.accountFollowing(loggedInUser.pk);
    const myFollowing = await followingFeed.items();
    await new Promise(resolve => setTimeout(resolve, 120000));
    //Mute all
    let i: number = 0;
    await muteFollower(myFollowing, ig,i);
    while (followingFeed.isMoreAvailable()) {
        console.log('More available');
        await new Promise(resolve => setTimeout(resolve, 120000));
        const myFollowing = await followingFeed.items();
        await muteFollower(myFollowing, ig, i);
    }
    //Mute recommendations
    console.log('Done');
})();


async function muteFollower(myFollowing: AccountFollowingFeedResponseUsersItem[], ig: IgApiClient, i: number) {
    for (const user of myFollowing) {
        await ig.friendship.mutePostsOrStoryFromFollow({ targetPostsAuthorId: user.pk.toString() , targetReelAuthorId: user.pk.toString()});
        console.log(`Muted ${user.username}`);
        const time = Math.round(Math.random() * 6000) + 1000;
        await new Promise(resolve => setTimeout(resolve, time));
        //Wait randomly doing 6 minutes another request
        i++;
        if (i % 50 === 0) {
            console.log('Waiting 2 minutes');
            await new Promise(resolve => setTimeout(resolve, 120000));
        }
    }
}