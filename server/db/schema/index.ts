import { relations } from 'drizzle-orm'
import { bigint, pgEnum, pgTable, smallint, timestamp, varchar } from 'drizzle-orm/pg-core'

export const user = pgTable('auth_user', {
  id: varchar('id', {
    length: 15, // change this when using custom user ids
  }).primaryKey(),
  username: varchar('username', {
    length: 32,
  }).notNull(),
  // other user attributes
})

export const session = pgTable('user_session', {
  id: varchar('id', {
    length: 128,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  activeExpires: bigint('active_expires', {
    mode: 'number',
  }).notNull(),
  idleExpires: bigint('idle_expires', {
    mode: 'number',
  }).notNull(),
})

export const key = pgTable('user_key', {
  id: varchar('id', {
    length: 255,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  hashedPassword: varchar('hashed_password', {
    length: 255,
  }),
})

export const userRole = pgEnum('role', ['admin', 'user'] as const)
export const taskStatus = pgEnum('status', ['todo', 'in-progress', 'done'] as const)

export const userProfile = pgTable('user_profile', {
  id: varchar('id', {
    length: 255,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: userRole('role').notNull(),
})

export const task = pgTable('task', {
  id: varchar('id', {
    length: 32,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  text: varchar('text', {
    length: 255,
  }).notNull(),
  priority: smallint('priority').notNull(),
  status: taskStatus('status').notNull(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'date', withTimezone: true }).notNull(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'date', withTimezone: true }).notNull(),
})

export const userRelations = relations(user, ({ many, one }) => ({
  tasks: many(task),
  profile: one(userProfile),
}))

export const taskRelations = relations(task, ({ one }) => ({
  user: one(user, {
    fields: [task.userId],
    references: [user.id],
  }),
}))

export const profileInfoRelations = relations(userProfile, ({ one }) => ({
  user: one(user),
}))
