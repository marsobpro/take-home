## Approach: 

As for my approach, I always try to comment the code quite well - I believe that a lack of comments does more harm than an excess.
In components, I like to simplify the return as much as possible, moving as much logic as possible to separate variables / components.
I also tried to keep the structure of the project in order, I believe that the time invested in this pays off many times during the work.
I moved most of the states to the Zustand Store, in order to have a single source of truth, consistency, and to simplify the component.


## Testing

I believe that testing is, of course, important.
The main advantages I see are that they:

Encourage thinking through component behaviors
Serve as living documentation of expected functionality (probably even better than my comments ;) )
Provide safety net when modifying code
Catch errors early when cheaper to fix

I would focus primarily on:
Verify title, description display
Check button visibility conditions
Card rendering with different prop combinations
Expand/collapse functionality
Delete and revert actions
No description scenario
Check animation state changes

------------------------------------------

## Rules

- add/remove/modify existing code to achieve the end result (some code needs a refactor)
- don't install additional packages
- you need to use `zustand`, but it's up to you to decide what state should be global
- write the code like it's a real feature

### Cards

- add expand/collapse functionality
- make sure the "Delete" button works
- add animations

### Deleted Cards

- display the number of deleted cards
- reveal deleted cards after user clicks the "Reveal" button - deleted card variant shouldn't contain the description
- write the code, so in the future you will be able to add "revert" functionality

### Behavior

- cards by default should be collapsed
- expanded/deleted cards' state needs to be persisted after "refreshing" (regardless of isVisible property)
- "refresh" functionality needs to be implemented using `react-query`

### Miscellaneous

- add a "Refresh" button (just like the "Reveal" button)
- create generic `<ToggleButton />`

### Additional

You may leave a message explaining your coding choices, but it's not necessary.
Testing framework isn't installed, so instead just explain whether you think it's a good or bad idea to write tests for this feature or how to approach it.
