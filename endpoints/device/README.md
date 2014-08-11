# device demo

This shows an example of writing a set of thin business logic
    on top of a database

## Implementation details

The following are implementation details that are not very
    important.

 - LevelDB database, this is an easy database to use for writing
        local integration tests, spinning up SQL locally is too
        much effort.
 - `require('evented-repository')` This is an implementation of
        an async Repository interface for a data store. The
        actual interface & implementation are not that important.
        The only important detail are encoders & decoders.
