/* eslint-disable no-unused-vars */
module.exports = ({
    knex = {},
    name = 'name',
    tableName = 'tableName',
    selectableProps = [],
    timeout = 1000
}) => {
    const create = (props) => {
        delete props.id;

        return knex.insert(props)
            .returning(selectableProps)
            .into(tableName)
            .timeout(timeout);
    };

    const find = (filters) => knex.select(selectableProps)
        .from(tableName)
        .where(filters)
        .timeout(timeout);

    const findOne = (filters) => find(filters)
        .then((results) => {
            if (!Array.isArray(results)) return results;

            return results[0];
        });
    return {
        create,
        find,
        findOne,
    };
};
