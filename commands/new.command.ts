import { AbstractCommand } from './abstract.command';
import { CommanderStatic, Command } from 'commander';
import { Input } from './command.input';
import { parse } from '../lib/inputs/parse';

export class NewCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('new [name] [description] [version] [author]')
      .alias('n')
      .description('Generate a new Nest application.')
      .option('-d, --dry-run', 'Allow to test changes before execute command.')
      .option('--skip-install', 'Allow to skip package installation.')
      .option('-p, --package-manager [package-manager]', 'Allow to specify package manager to skip package-manager selection.')
      .action(async (name: string, description: string, version: string, author: string, command: Command) => {
        const options: Input[] = [];
        options.push(parse('dry-run')(command[ 'dryRun' ] !== undefined ? command[ 'dryRun' ] : false));
        options.push(parse('skip-install')(command[ 'skip-install' ] !== undefined ? command[ 'skip-install' ] : false));
        options.push(parse('package-manager')(command[ 'packageManager' ]));
        const inputs: Input[] = [];
        inputs.push(parse('name')(name));
        inputs.push(parse('description')(description));
        inputs.push(parse('version')(version));
        inputs.push(parse('author')(author));
        await this.action.handle(inputs, options);
      });
  }
}
