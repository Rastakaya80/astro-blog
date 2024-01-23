export function formatBlogPosts(posts, {
  filterOutDrafts = true,
  filterOutFuturePosts = true,
  sortByDate = true,
  limit = undefined,
} = {}) {

  const filteredPosts = posts.reduce((acc, post) => {
    const { pubDate, draft } = post.frontmatter;
    // filter out drafts if true
    if(filterOutDrafts && draft) return acc;

    // filter out future posts if true
    if(filterOutFuturePosts && new Date(pubDate) > new Date()) return acc;

    // add post to acc (accumulator)
    acc.push(post);

    // finally, return the acc
    return acc;

  }, [])

  // sort by pubDate or randomize
  if(sortByDate){
    filteredPosts.sort((a, b) => new Date(b.frontmatter.pubDate) - new Date(a.frontmatter.pubDate));
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // limit if number is passed in
  if(typeof limit === "number"){
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;

}