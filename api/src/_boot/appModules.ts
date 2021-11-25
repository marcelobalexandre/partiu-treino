import { articleModule, ArticleRegistry } from '@/article';
import { ArticleMessages } from '@/article/messages';
import { commentModule, CommentRegistry } from '@/comment';
import { personalTrainerModule, PersonalTrainerRegistry } from '@/personalTrainer';
import { PersonalTrainerMessages } from '@/personalTrainer/messages';

type AppModulesMessages = ArticleMessages & PersonalTrainerMessages;

type AppModulesConfig = {};

const appModules = [articleModule, commentModule, personalTrainerModule];

type AppModulesRegistry = ArticleRegistry & CommentRegistry & PersonalTrainerRegistry;

export { appModules };
export type { AppModulesMessages, AppModulesConfig, AppModulesRegistry };
